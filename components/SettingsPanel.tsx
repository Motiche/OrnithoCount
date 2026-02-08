import React, { useState } from 'react';
import { AppSettings, Species, ValidationRule } from '../types';
import { Plus, Trash2, Save, X, Eye, EyeOff, RefreshCw, AlertCircle } from 'lucide-react';
import { DEFAULT_SPECIES } from '../speciesData';

interface SettingsPanelProps {
  settings: AppSettings;
  onUpdateSettings: (s: AppSettings) => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onUpdateSettings, onClose }) => {
  const [activeTab, setActiveTab] = useState<'species' | 'codes' | 'rules'>('species');
  
  // Local state for species editing
  const [localSpecies, setLocalSpecies] = useState<Species[]>([...settings.speciesList]);
  const [newSpeciesName, setNewSpeciesName] = useState('');
  const [newSpeciesAbb, setNewSpeciesAbb] = useState('');
  const [newSpeciesFamily, setNewSpeciesFamily] = useState('');

  // Local state for codes
  const [rawCodes, setRawCodes] = useState<Record<string, string>>(() => {
      const initial: Record<string, string> = {};
      Object.entries(settings.codes).forEach(([key, values]) => {
          initial[key] = (values as string[]).join(', ');
      });
      return initial;
  });
  const [localFields, setLocalFields] = useState({...settings.fields});

  // Local state for Rules
  const [localRules, setLocalRules] = useState<ValidationRule[]>(settings.rules || []);
  const [newRuleType, setNewRuleType] = useState<'family' | 'species'>('family');
  const [newRuleTarget, setNewRuleTarget] = useState('');
  const [newRuleRequired, setNewRuleRequired] = useState<Record<string, boolean>>({
      age: false, sex: false, direction: false, distance: false, morph: false
  });

  // Derived Families for Rules dropdown
  const uniqueFamilies = Array.from(new Set(localSpecies.map(s => s.family).filter(Boolean))) as string[];

  // --- Species Handlers ---
  const handleAddSpecies = () => {
    if (!newSpeciesName || !newSpeciesAbb) return;
    const newSpecies: Species = {
      id: Date.now().toString(),
      name: newSpeciesName,
      abbreviation: newSpeciesAbb.toUpperCase(),
      family: newSpeciesFamily
    };
    setLocalSpecies([...localSpecies, newSpecies]);
    setNewSpeciesName('');
    setNewSpeciesAbb('');
    setNewSpeciesFamily('');
  };

  const handleAddDefaults = () => {
      if(confirm("Add all default species to your current list? Duplicates based on abbreviation will be skipped.")) {
          const currentAbbs = new Set(localSpecies.map(s => s.abbreviation));
          const toAdd = DEFAULT_SPECIES.filter(d => !currentAbbs.has(d.abbreviation)).map(s => ({
              ...s,
              id: Date.now().toString() + Math.random().toString().slice(2,5) // Ensure unique IDs
          }));
          setLocalSpecies([...localSpecies, ...toAdd]);
      }
  };

  const handleDeleteSpecies = (id: string) => {
    setLocalSpecies(localSpecies.filter(s => s.id !== id));
  };

  const handleAbbChange = (id: string, newAbb: string) => {
    setLocalSpecies(localSpecies.map(s => s.id === id ? { ...s, abbreviation: newAbb.toUpperCase() } : s));
  };
  
  const handleFamilyChange = (id: string, newFamily: string) => {
    setLocalSpecies(localSpecies.map(s => s.id === id ? { ...s, family: newFamily } : s));
  };

  // --- Code Handlers ---
  const handleCodeChange = (category: string, value: string) => {
      setRawCodes(prev => ({...prev, [category]: value}));
  };
  
  const toggleFieldVisibility = (field: keyof typeof localFields) => {
      setLocalFields(prev => ({...prev, [field]: !prev[field]}));
  };

  // --- Rule Handlers ---
  const handleAddRule = () => {
      if (!newRuleTarget) return;

      const requiredFields = Object.keys(newRuleRequired).filter(k => newRuleRequired[k]);
      if (requiredFields.length === 0) {
          alert("Select at least one required field.");
          return;
      }
      
      let targetName = newRuleTarget;
      // If species, look up name
      if(newRuleType === 'species') {
          const s = localSpecies.find(x => x.id === newRuleTarget);
          if (s) targetName = s.name;
      }

      const newRule: ValidationRule = {
          id: Date.now().toString(),
          targetType: newRuleType,
          targetValue: newRuleTarget,
          targetName: targetName,
          requiredFields
      };

      setLocalRules([...localRules, newRule]);
      setNewRuleTarget('');
      setNewRuleRequired({ age: false, sex: false, direction: false, distance: false, morph: false });
  };

  const handleDeleteRule = (id: string) => {
      setLocalRules(localRules.filter(r => r.id !== id));
  };

  // --- Main Save ---
  const handleSave = () => {
    // Parse raw strings back into arrays
    const parsedCodes: any = {};
    Object.entries(rawCodes).forEach(([key, value]) => {
        parsedCodes[key] = (value as string).split(/[,\n]/).map(s => s.trim()).filter(s => s.length > 0);
    });

    onUpdateSettings({
        ...settings,
        speciesList: localSpecies,
        codes: parsedCodes,
        fields: localFields,
        rules: localRules
    });
    onClose();
  };
  
  const clearHistory = () => {
      if(confirm("Clear all saved location names?")) {
          localStorage.removeItem('orni_history');
          alert("History cleared.");
      }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full">
            <X size={20} className="dark:text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-slate-700 overflow-x-auto">
            {['species', 'codes', 'rules'].map(tab => (
                 <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-1 min-w-[100px] py-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                >
                    {tab === 'codes' ? 'Count Codes' : tab}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {activeTab === 'species' && (
              <>
                 <div className="space-y-4">
                    <h3 className="font-semibold text-lg dark:text-gray-200">Add New Species</h3>
                    <div className="flex gap-2 items-end flex-wrap md:flex-nowrap">
                        <div className="flex-1 min-w-[120px]">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                            <input 
                            type="text" 
                            value={newSpeciesName}
                            onChange={(e) => setNewSpeciesName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                            placeholder="e.g. Blue Tit"
                            />
                        </div>
                         <div className="w-full md:w-32">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Family</label>
                            <input 
                            type="text" 
                            value={newSpeciesFamily}
                            onChange={(e) => setNewSpeciesFamily(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                            placeholder="Paridae"
                            />
                        </div>
                        <div className="w-24">
                            <label className="block text-xs font-medium text-gray-500 mb-1">Abbr.</label>
                            <input 
                            type="text" 
                            value={newSpeciesAbb}
                            onChange={(e) => setNewSpeciesAbb(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white uppercase focus:ring-1 focus:ring-primary outline-none"
                            placeholder="BLUTIT"
                            />
                        </div>
                        <button 
                            onClick={handleAddSpecies}
                            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-lime-600 transition-colors flex items-center"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg dark:text-gray-200">Manage Species ({localSpecies.length})</h3>
                        <button onClick={handleAddDefaults} className="text-xs flex items-center gap-1 text-primary hover:text-sky-700 bg-sky-50 dark:bg-sky-900/20 px-3 py-1.5 rounded-full transition-colors">
                            <RefreshCw size={12}/> Add All Defaults
                        </button>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden dark:border-slate-700">
                    <div className="max-h-[400px] overflow-y-auto">
                        <table className="w-full text-left text-sm">
                        <thead className="bg-gray-100 dark:bg-slate-900 sticky top-0">
                            <tr>
                            <th className="p-3 font-medium text-gray-600 dark:text-gray-400">Name</th>
                            <th className="p-3 font-medium text-gray-600 dark:text-gray-400">Family</th>
                            <th className="p-3 font-medium text-gray-600 dark:text-gray-400">Abbr</th>
                            <th className="p-3 font-medium text-gray-600 dark:text-gray-400 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                            {localSpecies.map((species) => (
                            <tr key={species.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                <td className="p-3 dark:text-gray-300">{species.name}</td>
                                <td className="p-3">
                                     <input 
                                        type="text"
                                        value={species.family || ''}
                                        onChange={(e) => handleFamilyChange(species.id, e.target.value)}
                                        className="w-full bg-transparent border-b border-gray-300 focus:border-primary outline-none text-xs text-gray-500 dark:text-gray-400"
                                    />
                                </td>
                                <td className="p-3">
                                    <input 
                                        type="text"
                                        value={species.abbreviation}
                                        onChange={(e) => handleAbbChange(species.id, e.target.value)}
                                        className="w-20 bg-transparent border-b border-gray-300 focus:border-primary outline-none dark:text-white uppercase"
                                    />
                                </td>
                                <td className="p-3 text-right">
                                <button 
                                    onClick={() => handleDeleteSpecies(species.id)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <Trash2 size={16} />
                                </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                
                 <div className="pt-4 border-t dark:border-slate-700">
                    <button onClick={clearHistory} className="text-red-500 text-xs hover:underline">Clear Location History</button>
                 </div>
              </>
          )}

          {activeTab === 'codes' && (
              <div className="space-y-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                      Customize the buttons available in the Migration Count panel. Toggle visibility or edit the comma-separated lists to change the available options.
                  </p>
                  
                  {Object.entries(rawCodes).map(([key, rawValue]) => {
                      const fieldKey = key as keyof typeof localFields;
                      const isVisible = localFields[fieldKey] !== undefined ? localFields[fieldKey] : true;
                      const preview = (rawValue as string).split(/[,\n]/).map(s => s.trim()).filter(Boolean);

                      return (
                        <div key={key} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold capitalize dark:text-gray-200">{key} Codes</h4>
                                {localFields[fieldKey] !== undefined && (
                                    <button 
                                        onClick={() => toggleFieldVisibility(fieldKey)}
                                        className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${isVisible ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-500'}`}
                                    >
                                        {isVisible ? <Eye size={12}/> : <EyeOff size={12}/>} {isVisible ? 'Visible' : 'Hidden'}
                                    </button>
                                )}
                            </div>
                            <textarea 
                                value={rawValue as string}
                                onChange={(e) => handleCodeChange(key, e.target.value)}
                                className="w-full h-20 p-3 rounded-lg border dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-sm font-mono dark:text-white focus:ring-1 focus:ring-primary outline-none"
                            />
                            <p className="text-xs text-gray-400">Preview: {preview.map(v => <span key={v} className="mr-1 bg-gray-100 dark:bg-slate-600 px-1 rounded">{v}</span>)}</p>
                        </div>
                      );
                  })}
              </div>
          )}

          {activeTab === 'rules' && (
              <div className="space-y-6">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 flex gap-2">
                      <AlertCircle className="text-yellow-600 dark:text-yellow-400 shrink-0" />
                      <div className="text-sm text-yellow-800 dark:text-yellow-200">
                          <p className="font-bold mb-1">Validation Rules</p>
                          <p>Force specific fields to be required for certain bird families or species in Migration Mode (e.g., "Age is required for Eagles").</p>
                      </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-xl border dark:border-slate-700">
                      <h4 className="font-bold mb-3 dark:text-white">Create New Rule</h4>
                      <div className="flex gap-4 mb-4">
                          <label className="flex items-center gap-2 text-sm dark:text-gray-300 cursor-pointer">
                              <input type="radio" checked={newRuleType === 'family'} onChange={() => setNewRuleType('family')} className="text-primary"/> 
                              By Family
                          </label>
                          <label className="flex items-center gap-2 text-sm dark:text-gray-300 cursor-pointer">
                              <input type="radio" checked={newRuleType === 'species'} onChange={() => setNewRuleType('species')} className="text-primary"/> 
                              By Species
                          </label>
                      </div>
                      
                      <div className="mb-4">
                          {newRuleType === 'family' ? (
                              <select 
                                value={newRuleTarget}
                                onChange={(e) => setNewRuleTarget(e.target.value)}
                                className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                              >
                                  <option value="">Select Family...</option>
                                  {uniqueFamilies.sort().map(f => (
                                      <option key={f} value={f}>{f}</option>
                                  ))}
                              </select>
                          ) : (
                              <select 
                                value={newRuleTarget}
                                onChange={(e) => setNewRuleTarget(e.target.value)}
                                className="w-full p-2 rounded border dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                              >
                                  <option value="">Select Species...</option>
                                  {localSpecies.sort((a,b) => a.name.localeCompare(b.name)).map(s => (
                                      <option key={s.id} value={s.id}>{s.name} ({s.abbreviation})</option>
                                  ))}
                              </select>
                          )}
                      </div>

                      <div className="mb-4">
                          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Required Fields</label>
                          <div className="flex flex-wrap gap-4">
                              {['age', 'sex', 'direction', 'distance', 'morph'].map(field => (
                                  <label key={field} className="flex items-center gap-2 text-sm capitalize dark:text-gray-300 cursor-pointer select-none">
                                      <input 
                                        type="checkbox" 
                                        checked={newRuleRequired[field]} 
                                        onChange={() => setNewRuleRequired({...newRuleRequired, [field]: !newRuleRequired[field]})}
                                        className="rounded text-primary focus:ring-primary"
                                      />
                                      {field}
                                  </label>
                              ))}
                          </div>
                      </div>

                      <button onClick={handleAddRule} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                          <Plus size={16} /> Add Rule
                      </button>
                  </div>

                  <div className="space-y-2">
                      <h4 className="font-bold dark:text-white">Active Rules</h4>
                      {localRules.length === 0 && <p className="text-sm text-gray-500">No rules defined.</p>}
                      {localRules.map(rule => (
                          <div key={rule.id} className="flex justify-between items-center p-3 bg-white dark:bg-slate-700 rounded-lg border border-gray-100 dark:border-slate-600">
                              <div>
                                  <p className="font-bold text-sm dark:text-white">
                                      {rule.targetType === 'family' ? `Family: ${rule.targetValue}` : `Species: ${rule.targetName}`}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                      Requires: <span className="text-red-500 font-medium">{rule.requiredFields.join(', ')}</span>
                                  </p>
                              </div>
                              <button onClick={() => handleDeleteRule(rule.id)} className="text-gray-400 hover:text-red-500">
                                  <Trash2 size={16} />
                              </button>
                          </div>
                      ))}
                  </div>
              </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg dark:text-gray-300 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-sky-600 flex items-center gap-2"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};