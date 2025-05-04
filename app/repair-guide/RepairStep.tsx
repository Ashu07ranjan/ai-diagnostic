
import React from "react";
import { ChevronDown, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RepairStep as RepairStepType } from "../types/repair";

interface RepairStepProps {
  step: RepairStepType;
  index: number;
  expanded: boolean;
  toggleStep: () => void;
}

const RepairStep: React.FC<RepairStepProps> = ({ step, index, expanded, toggleStep }) => {
  return (
    <div className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
      <button
        className="w-full flex items-center justify-between p-3 text-left"
        onClick={toggleStep}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              step.completed ? "bg-green-500/20 text-green-400" : "bg-slate-700 text-slate-300"
            }`}
          >
            {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
          </div>
          <span className="font-medium">{step.title}</span>
        </div>
        {expanded ? (
          <ChevronDown className="h-5 w-5 text-slate-400" />
        ) : (
          <ChevronRight className="h-5 w-5 text-slate-400" />
        )}
      </button>
      {expanded && (
        <div className="p-3 pt-0 border-t border-slate-700">
          <p className="text-sm text-slate-300 mb-3">{step.description}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs border-slate-600 bg-slate-700 no-hover"
          >
            Mark as Completed
          </Button>
        </div>
      )}
    </div>
  );
};

export default RepairStep;