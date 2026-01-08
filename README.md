# NextHire 🎯

**AI-Powered Interview Platform for Modern Hiring**

NextHire is an intelligent interview platform that leverages cutting-edge AI voice technology to conduct automated, personalized job interviews. Built for recruiters and hiring managers who want to streamline their candidate screening process.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)
![Vapi AI](https://img.shields.io/badge/Vapi-Voice_AI-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)

---

## 🚀 How It Works

### 1. **Create an Interview**
Recruiters log in via Google OAuth and create a new interview by specifying:
- **Job Title & Description** – Define the role you're hiring for
- **Interview Duration** – Set time limits (5-30 minutes)
- **Interview Type** – Choose from Technical, Behavioral, Experience, Problem Solving, or Leadership

### 2. **AI Generates Smart Questions**
Using Google's Generative AI (Gemini), NextHire automatically generates tailored interview questions based on:
- The job position and responsibilities
- Required skills from the job description
- Selected interview type and duration
- Industry best practices

### 3. **Share Interview Link**
Once created, a unique interview link is generated that can be shared with candidates. No app installation required – candidates simply:
- Enter their name and email
- Click "Join Interview"
- Start the AI-powered voice interview

### 4. **AI Voice Interview**
Powered by **Vapi AI**, the interview experience includes:
- 🎙️ Real-time voice conversation with an AI recruiter
- 📝 Adaptive questioning based on candidate responses
- 💡 Hints and rephrasing for struggling candidates
- ⏱️ Automatic timer tracking
- 🎯 Natural, engaging conversation flow

### 5. **Automated Feedback & Scoring**
After the interview, AI analyzes the conversation and provides:
- **Ratings out of 10** for: Technical Skills, Communication, Problem Solving, Experience
- **Performance Summary** – Concise 3-line evaluation
- **Hire Recommendation** – Yes/No with reasoning
- All feedback is saved to the dashboard

### 6. **Review Candidates**
Recruiters can view all interviews and candidate feedback from the dashboard, making it easy to compare and shortlist candidates.

---

## ✨ Unique Selling Points (USP)

| Feature | Benefit |
|---------|---------|
| 🤖 **AI Voice Interviews** | Conduct interviews 24/7 without human involvement |
| ⚡ **Zero Setup for Candidates** | Candidates join via link – no downloads or accounts needed |
| 🎯 **Smart Question Generation** | AI creates role-specific questions tailored to job requirements |
| 📊 **Objective Scoring** | Eliminate bias with AI-powered candidate evaluation |
| 🔄 **Real-time Adaptation** | AI adjusts difficulty and provides hints based on responses |
| 📈 **Scalable Screening** | Interview hundreds of candidates simultaneously |
| 🔒 **Secure & Private** | Built with Supabase for enterprise-grade security |

---

## 🎯 Key Features

### For Recruiters
- ✅ Google OAuth authentication
- ✅ Create unlimited interview templates
- ✅ Customize interview duration & type
- ✅ View all candidates and their feedback
- ✅ Track number of candidates per interview
- ✅ Dashboard with interview history

### For Candidates
- ✅ No registration required
- ✅ Join interview with just name & email
- ✅ Natural voice conversation with AI
- ✅ Visual feedback on active speaker
- ✅ Timer display during interview
- ✅ Instant completion confirmation

### AI Capabilities
- ✅ GPT-4 powered conversational AI
- ✅ Deepgram Nova-2 speech recognition
- ✅ PlayHT natural voice synthesis
- ✅ Google Gemini for question generation
- ✅ Contextual follow-up questions
- ✅ Automated performance analysis

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **Supabase** | Database, Authentication & Real-time |
| **Vapi AI** | Voice AI & Real-time conversations |
| **Google Gemini** | Question & feedback generation |
| **Tailwind CSS v4** | Styling & responsive design |
| **Framer Motion** | Animations & transitions |
| **Radix UI** | Accessible UI components |
| **Lucide React** | Icon library |

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Vapi AI API key
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nexthire.git
   cd nexthire/NextHire
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_VAPI_AI=your_vapi_api_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
NextHire/
├── app/
│   ├── (main)/           # Authenticated routes
│   │   ├── dashboard/    # Main dashboard & create interview
│   │   └── _components/  # Dashboard components
│   ├── interview/        # Interview flow
│   │   ├── [interviewId]/
│   │   │   ├── start/    # Live interview session
│   │   │   └── completed/# Interview completion page
│   │   └── _components/  # Interview components
│   ├── api/              # API routes for AI
│   ├── login/            # Authentication
│   └── all-interviews/   # Interview list view
├── components/           # Reusable UI components
├── context/              # React context providers
├── services/             # Supabase client & constants
└── public/               # Static assets
```

---

## 🔮 Future Roadmap

- [ ] Video interview support
- [ ] Custom AI voice selection
- [ ] Multi-language support
- [ ] Interview analytics dashboard
- [ ] Team collaboration features
- [ ] ATS integrations
- [ ] Mobile app

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

<p align="center">
  Built with ❤️ using Next.js and AI
</p>
