import { SectionResult } from "./section-result.model";

export interface TestResult {
  showResults?: boolean;
  subCat: string;
  year: string;
  finishedAt: string;
  score: number;
  percentageScore: number;
  sections: SectionResult[];
}