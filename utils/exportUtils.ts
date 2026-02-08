import { Session, Species } from '../types';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generateCSV = (session: Session, speciesList: Species[]) => {
  let csv = "Timestamp,Species,Abbr,Family,Count,Lat,Lng,Direction,Age,Sex,Morph,Distance,Status,Notes\n";
  session.sightings.forEach(s => {
    const sp = speciesList.find(x => x.id === s.speciesId);
    csv += `${s.timestamp},"${sp?.name || 'Unknown'}",${sp?.abbreviation || ''},${sp?.family || ''},${s.count},${s.latitude||''},${s.longitude||''},${s.direction||''},${s.age||''},${s.sex||''},${s.morph||''},${s.distance||''},${s.status||''},"${(s.comment||'').replace(/"/g, '""')}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ornicount_${session.name.replace(/\s+/g, '_')}_${session.date}.csv`;
  a.click();
};

export const generateJSON = (session: Session) => {
  const data = JSON.stringify(session, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ornicount_${session.name.replace(/\s+/g, '_')}_${session.date}.json`;
  a.click();
};

export const generateTextSummary = (session: Session, speciesList: Species[]) => {
  let summary = `BIRD TRIP REPORT: ${session.name.toUpperCase()}\n`;
  summary += `Date: ${session.date}\nObservers: ${session.observers}\n`;
  if (session.latitude) summary += `GPS: ${session.latitude}, ${session.longitude}\n`;
  if (session.weather) {
      const w = session.weather;
      const wStr = [
          w.temperature ? `${w.temperature}°C` : '',
          w.cloudCover ? `${w.cloudCover}% Cloud` : '',
          w.windSpeed ? `Wind: ${w.windSpeed}` : '',
          w.precipitation ? `Precip: ${w.precipitation}` : ''
      ].filter(Boolean).join(', ');
      if (wStr) summary += `Weather: ${wStr}\n`;
  }
  if (session.notes) summary += `Notes: ${session.notes}\n`;
  summary += `-------------------------------------------\n`;
  
  const totals: Record<string, number> = {};
  const comments: string[] = [];
  
  session.sightings.forEach(s => {
      const sp = speciesList.find(x => x.id === s.speciesId);
      const name = sp?.name || 'Unknown';
      totals[name] = (totals[name] || 0) + s.count;
      if (s.comment) comments.push(`${name}: ${s.comment}`);
  });

  Object.entries(totals)
    .sort(([,a], [,b]) => b - a)
    .forEach(([name, count]) => {
      summary += `${name}: ${count}\n`;
  });

  if (comments.length > 0) {
      summary += `\nDetailed Comments:\n`;
      comments.forEach(c => summary += `- ${c}\n`);
  }

  return summary;
};

export const generatePDF = (session: Session, speciesList: Species[]) => {
  const doc = new jsPDF();
  
  // -- HEADER --
  doc.setFillColor(14, 165, 233); // Sky Blue
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.text("ORNICOUNT PRO", 14, 20);
  doc.setFontSize(12);
  doc.text("Field Report", 14, 28);
  doc.text(session.date, 195, 20, { align: 'right' });
  doc.text(session.name, 195, 28, { align: 'right' });

  // -- METADATA --
  let y = 50;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  
  doc.setFont("helvetica", "bold");
  doc.text("Location:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.text(session.name, 40, y);
  
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text("Time:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.text(`${session.startTime} - ${session.endTime || 'Ongoing'}`, 40, y);

  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text("Observers:", 14, y);
  doc.setFont("helvetica", "normal");
  doc.text(session.observers, 40, y);

  // Combine GPS and Weather on one line/block for "besides" look
  if (session.latitude || (session.weather && Object.values(session.weather).some(Boolean))) {
      y += 6;
      doc.setFont("helvetica", "bold");
      
      // GPS
      if (session.latitude) {
          doc.text("GPS:", 14, y);
          doc.setFont("helvetica", "normal");
          doc.text(`${session.latitude}, ${session.longitude}`, 25, y);
      }
      
      // Weather (Placed at x=110 for "besides")
      if (session.weather) {
          const w = session.weather;
          const wStr = [
              w.temperature ? `${w.temperature}°C` : '',
              w.cloudCover ? `${w.cloudCover}%` : '',
              w.windSpeed ? `Wind: ${w.windSpeed}` : ''
          ].filter(Boolean).join(', ');
          
          if (wStr) {
             const startX = session.latitude ? 110 : 14;
             doc.setFont("helvetica", "bold");
             doc.text("Weather:", startX, y);
             doc.setFont("helvetica", "normal");
             doc.text(wStr, startX + 18, y);
          }
      }
  }
  
  // Notes
  if(session.notes) {
      y += 10;
      doc.setFontSize(12);
      doc.setTextColor(14, 165, 233); // Blue
      doc.text("Field Notes", 14, y);
      doc.setTextColor(0,0,0);
      doc.setFontSize(10);
      y += 5;
      const splitNotes = doc.splitTextToSize(session.notes, 180);
      doc.text(splitNotes, 14, y);
      y += (splitNotes.length * 5);
  } else {
      y += 10;
  }

  // -- TABLE --
  const speciesMap = new Map<string, number>();
  session.sightings.forEach(s => speciesMap.set(s.speciesId, (speciesMap.get(s.speciesId)||0) + s.count));
  
  const totalBirds = session.sightings.reduce((a,b)=>a+b.count,0);
  const totalSpecies = speciesMap.size;

  y += 5;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Total Count: ${totalBirds} individuals | ${totalSpecies} species`, 14, y);
  y += 2;

  const tableData = Array.from(speciesMap.entries())
    .map(([id, count]) => {
        const sp = speciesList.find(x => x.id === id);
        return [sp?.name || 'Unknown', sp?.family || '', count.toString()];
    })
    .sort((a,b) => parseInt(b[2]) - parseInt(a[2])); // Sort by count

  autoTable(doc, {
      startY: y + 5,
      head: [['Species', 'Family', 'Count']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [14, 165, 233], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 248, 255] },
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
          2: { halign: 'right', fontStyle: 'bold' }
      }
  });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text("Generated by OrniCount Pro - birdsofiran.com", 14, doc.internal.pageSize.height - 10);
  
  doc.save(`ornicount_report_${session.date}.pdf`);
};