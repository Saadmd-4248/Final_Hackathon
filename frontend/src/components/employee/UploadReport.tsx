import React, { useState } from 'react'
import { Button, Card, CardContent, Typography, TextField } from '@mui/material'


export default function UploadReport(){
const [file, setFile] = useState(null)
const [date, setDate] = useState('')
const [type, setType] = useState('')


const handleUpload = async (e) => {
e.preventDefault()
if(!file) return alert('Select a file')
// TODO: upload to Cloudinary/Firebase and send to backend which calls Gemini
alert('Uploaded (stub). Backend integration required.')
}


return (
<Card className="max-w-2xl mx-auto">
<CardContent>
<Typography variant="h6" className="mb-4">Upload Report</Typography>
<form onSubmit={handleUpload} className="space-y-4">
<input type="file" accept="application/pdf,image/*" onChange={e=>setFile(e.target.files?.[0] ?? null)} />
<TextField type="date" fullWidth value={date} onChange={e=>setDate(e.target.value)} />
<TextField label="Report Type (e.g., CBC, X-Ray)" fullWidth value={type} onChange={e=>setType(e.target.value)} />
<div className="flex gap-2">
<Button type="submit" variant="contained">Upload & Analyze</Button>
<Button variant="outlined" onClick={()=>{setFile(null); setDate(''); setType('')}}>Reset</Button>
</div>
</form>
<p className="mt-3 text-sm text-gray-500">Roman Urdu: "File select karein — Gemini khud PDF/image padh lega."</p>
</CardContent>
</Card>
)
}