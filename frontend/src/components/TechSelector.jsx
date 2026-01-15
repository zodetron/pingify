import React, { useState } from 'react';
import { Check, Search, X } from 'lucide-react';
import { ALL_TECHNOLOGIES } from '../constants';

const TechSelector = ({ value, onChange, label, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedTech = ALL_TECHNOLOGIES.find(tech => tech.id === value);

  const filteredTechs = ALL_TECHNOLOGIES.filter(tech =>
    tech.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (techId) => {
    onChange(techId);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
      </label>

      {/* Selected Tech Display / Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative cursor-pointer rounded-xl border-2 transition-all duration-300
          ${isOpen ? 'border-primary shadow-lg' : 'border-base-300 hover:border-primary/50'}
          ${selectedTech ? 'bg-base-200' : 'bg-base-100'}
          p-4 min-h-[80px] flex items-center justify-center
        `}
      >
        {selectedTech ? (
          <div className="flex items-center gap-3">
            <i className={`${selectedTech.icon} text-4xl`} style={{ color: selectedTech.color }}></i>
            <span className="text-lg font-semibold">{selectedTech.label}</span>
            <button
              onClick={handleClear}
              className="ml-auto btn btn-ghost btn-circle btn-sm hover:bg-error/20"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <div className="text-base-content/50 flex items-center gap-2">
            <Search className="size-5" />
            <span>{placeholder}</span>
          </div>
        )}
      </div>

      {/* Dropdown Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div className="absolute z-50 mt-2 w-full max-w-full bg-base-200 rounded-2xl shadow-2xl border border-base-300 overflow-hidden">
            {/* Search Bar */}
            <div className="p-4 border-b border-base-300 bg-base-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search technologies..."
                  className="input input-bordered w-full pl-10"
                  autoFocus
                />
              </div>
            </div>

            {/* Tech Grid */}
            <div className="tech-selector-grid custom-scrollbar p-4">
              {filteredTechs.length > 0 ? (
                filteredTechs.map((tech) => (
                  <div
                    key={tech.id}
                    onClick={() => handleSelect(tech.id)}
                    className={`tech-card ${value === tech.id ? 'selected' : ''}`}
                  >
                    <i className={tech.icon} style={{ color: tech.color }}></i>
                    <span className="tech-card-label">{tech.label}</span>
                    
                    {value === tech.id && (
                      <div className="tech-card-check">
                        <Check className="size-3 text-white" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-base-content/50">
                  No technologies found
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-base-300 bg-base-100 text-center">
              <p className="text-xs text-base-content/60">
                {filteredTechs.length} {filteredTechs.length === 1 ? 'technology' : 'technologies'} available
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TechSelector;
