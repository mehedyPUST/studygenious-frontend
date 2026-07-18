# 🧠 StudyGenius – AI-Powered Study Planner & Learning Assistant

A production-ready Full Stack Agentic AI application built with modern web technologies and Large Language Models (LLMs). StudyGenius helps students and lifelong learners create personalized study plans, automatically generates high‑quality study notes and summaries, and provides smart recommendations for learning resources – all powered by AI.

**Live Demo:** _[your-frontend-link.vercel.app](https://your-frontend-link.vercel.app)_  
**Backend API:** _[study-genious-tawny.vercel.app](https://study-genious-tawny.vercel.app)_

---

## ✨ Features

### 🔐 Authentication & Authorization
- Register / Login with JWT (access & refresh tokens)
- Google OAuth 2.0 social login
- Demo login with auto‑filled credentials
- Protected routes and role‑based access (optional extension)

### 📚 Study Plans CRUD
- Public explore page with **search, filtering (subject, difficulty, rating), sorting, and pagination**
- Detailed plan view with reviews and related plans
- Authenticated users can **create, update, and delete** their own plans
- AI‑powered content generation for plan descriptions/modules

### 🤖 Agentic AI Features (at least two)
1. **AI Content Generator**  
   Generates high‑quality study plan content (introduction, modules, summary) based on topic and difficulty. Supports adjustable output length, regeneration, and refinement with memory.

2. **AI Smart Recommendation Engine**  
   Analyzes user interactions (views, saves, likes) and provides personalized resource recommendations (courses, videos, books). Continuously improves via feedback loop (thumbs up/down).

3. **AI Document Intelligence (optional extension)** – planned for future.

### 🎨 Professional UI/UX
- **Three primary colors** (Emerald, Teal, Amber) + neutral Slate
- Fully responsive (mobile, tablet, desktop)
- Sticky navbar (3 logged‑out links / 5 logged‑in links)
- Landing page with **7 meaningful sections** (Hero, Features, How It Works, Statistics, Testimonials, Blog, FAQ, CTA)
- Consistent card designs (same height, width, border radius)
- Skeleton loaders, no placeholder content
- Additional pages: About, Contact, Privacy, Terms

---

## 🛠️ Tech Stack

| Layer       | Technology                                                                 |
|-------------|----------------------------------------------------------------------------|
| **Frontend**| Next.js 14 (App Router), TypeScript, Tailwind CSS, TanStack Query, Recharts, React Hook Form + Zod, Lucide Icons |
| **Backend** | Node.js, Express, TypeScript, MongoDB (native driver), JWT, bcrypt, Google OAuth |
| **AI**      | Google Gemini API (`gemini-2.0-flash`) with mock fallback for development  |
| **Deployment** | Vercel (frontend & backend as serverless functions), MongoDB Atlas       |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+  
- MongoDB Atlas account (or local MongoDB)  
- Google Cloud project (for OAuth) and Gemini API key  
- Git & Vercel account (for deployment)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/studygenius.git
cd studygenius