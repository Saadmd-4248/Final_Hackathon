import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Report {
  id: string;
  title: string;
  date: string;
  summary: string;
}

interface ReportCardProps {
  report: Report;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  return (
    <Card
      sx={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" className="font-semibold text-gray-800 mb-1">
          {report.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-2">
          {new Date(report.date).toDateString()}
        </Typography>
        <Typography variant="body2" className="text-gray-600">
          {report.summary}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
