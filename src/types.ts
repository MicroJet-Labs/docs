/**
 * Shared Type Definitions for MicroJet website
 */

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  codeSample?: string;
  highlightWords?: string[];
}

export interface InteractiveTab {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  description: string;
  codeSnippet: string;
  highlightedLines?: number[];
  featuresList: string[];
}

export interface BenchmarkData {
  framework: string;
  throughput: number; // requests per second
  latency: number;    // average response time in ms
  memory: number;     // memory consumption in MB
  isMicroJet: boolean;
}

export interface SandboxStep {
  id: number;
  label: string;
  title: string;
  instruction: string;
  code: string;
  endpoint: string;
  expectedResponse: Record<string, any>;
}
