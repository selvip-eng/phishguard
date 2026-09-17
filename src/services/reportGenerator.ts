import jsPDF from 'jspdf';
import type { AnalysisResult, TrainingSession } from '../types';

export const generateAnalysisReport = (result: AnalysisResult, type: 'Email' | 'URL', inputInfo?: string) => {
  const doc = new jsPDF();
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(6, 182, 212); // Primary Cyan
  doc.text('PHISHGUARD', 20, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(50, 50, 50);
  doc.text('Phishing Analysis Report', 20, 30);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${new Date().toLocaleString()}`, 20, 40);
  doc.text(`Analysis Type: ${type}`, 20, 47);
  
  doc.setFont('helvetica', 'bold');
  let color = [16, 185, 129]; // success
  if (result.level.includes('MEDIUM')) color = [245, 158, 11]; // warning
  if (result.level.includes('HIGH') || result.level.includes('CRITICAL')) color = [239, 68, 68]; // danger
  
  doc.setTextColor(color[0], color[1], color[2]);
  doc.text(`Risk Score: ${result.score}/100 (${result.level})`, 20, 57);
  
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('Threat Intelligence:', 20, 67);
  doc.setFont('helvetica', 'normal');
  doc.text(result.threatIntelAvailable ? 'Active' : 'Unavailable (Local Analysis Only)', 65, 67);
  
  let y = 80;
  
  if (inputInfo) {
    doc.setFont('helvetica', 'bold');
    doc.text('Input Summary:', 20, y);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(inputInfo, 170);
    doc.text(lines, 20, y + 7);
    y += 10 + (lines.length * 5);
  }
  
  doc.setFont('helvetica', 'bold');
  doc.text(`Detected Indicators (${result.indicators.length}):`, 20, y);
  y += 7;
  
  if (result.indicators.length === 0) {
    doc.setFont('helvetica', 'normal');
    doc.text('No major threats detected.', 20, y);
  } else {
    for (const ind of result.indicators) {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.text(`- ${ind.label} (+${ind.score} pts)`, 20, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      
      const evidenceLines = doc.splitTextToSize(`Evidence: ${ind.evidence}`, 160);
      doc.text(evidenceLines, 25, y);
      y += (evidenceLines.length * 5);
      
      const actionLines = doc.splitTextToSize(`Recommendation: ${ind.action}`, 160);
      doc.text(actionLines, 25, y);
      y += (actionLines.length * 5) + 3;
    }
  }

  doc.save(`PhishGuard_Analysis_${new Date().getTime()}.pdf`);
};

export const generateTrainingReport = (session: TrainingSession) => {
  const doc = new jsPDF();
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(6, 182, 212);
  doc.text('PHISHGUARD', 20, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(50, 50, 50);
  doc.text('Cybersecurity Training Report', 20, 30);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${session.completedAt}`, 20, 45);
  doc.text(`Scenario: ${session.scenarioTitle}`, 20, 52);
  doc.text(`Completion Status: COMPLETED`, 20, 59);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Performance Summary:', 20, 75);
  doc.setFont('helvetica', 'normal');
  
  const accuracy = Math.round((session.correctAnswers / session.totalQuestions) * 100);
  
  doc.text(`Score: ${session.score}/100`, 25, 85);
  doc.text(`Accuracy: ${accuracy}%`, 25, 92);
  doc.text(`Total Questions: ${session.totalQuestions}`, 25, 99);
  doc.text(`Correct Answers: ${session.correctAnswers}`, 25, 106);
  doc.text(`Incorrect Answers: ${session.incorrectAnswers}`, 25, 113);
  
  let y = 130;

  doc.setFont('helvetica', 'bold');
  doc.text('Topics Covered & Detected Skills:', 20, y);
  doc.setFont('helvetica', 'normal');
  y += 10;
  
  if (session.detectedSkills.length === 0) {
    doc.text('None recorded.', 25, y);
    y += 7;
  } else {
    for (const skill of session.detectedSkills) {
      doc.text(`- ${skill}`, 25, y);
      y += 7;
    }
  }
  
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Learning Areas / Needs Improvement:', 20, y);
  doc.setFont('helvetica', 'normal');
  y += 10;
  
  if (session.areasForImprovement.length === 0) {
    doc.text('Perfect score! No specific weak areas identified.', 25, y);
    y += 7;
  } else {
    for (const area of session.areasForImprovement) {
      doc.text(`- ${area}`, 25, y);
      y += 7;
    }
  }

  if (y > 250) {
    doc.addPage();
    y = 20;
  } else {
    y += 10;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('Recommendations:', 20, y);
  doc.setFont('helvetica', 'normal');
  y += 10;
  
  for (const rec of session.recommendations) {
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
    const recLines = doc.splitTextToSize(`- ${rec}`, 160);
    doc.text(recLines, 25, y);
    y += (recLines.length * 7);
  }
  
  doc.save(`PhishGuard_Training_${new Date().getTime()}.pdf`);
};
