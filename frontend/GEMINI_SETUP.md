# Gemini API Integration Setup

This project now includes direct Gemini API integration for analyzing medical reports.

## Setup Instructions

### 1. Get Your Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables
1. Create a `.env` file in the root directory
2. Add your API key:
```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Application
```bash
npm run dev
```

## How It Works

1. **PDF Upload**: Users can upload PDF medical reports
2. **Text Extraction**: The app extracts text from PDF files using pdf.js
3. **AI Analysis**: The extracted text is sent to Gemini AI for analysis
4. **Results Display**: Gemini provides a comprehensive analysis in simple terms

## Features

- ✅ PDF text extraction
- ✅ Direct Gemini API integration (no backend needed)
- ✅ Loading states and error handling
- ✅ Beautiful UI with analysis results
- ✅ Support for various medical report types

## API Usage

The app sends a structured prompt to Gemini including:
- Report type and date
- Extracted medical content
- Request for simple explanations
- Health recommendations

## Error Handling

- API key validation
- Network error handling
- PDF extraction error handling
- User-friendly error messages
