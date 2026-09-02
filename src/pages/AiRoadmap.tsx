import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Database, Network, Code, Server, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { aiPhases, aiFinalStack } from '../data/aiRoadmapData';

export default function AiRoadmap() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] font-sans pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/10 text-[#6366F1] text-xs font-bold uppercase tracking-wider mb-6 border border-[#6366F1]/20"
          >
            <Brain className="w-4 h-4" />
            Complete Learning Roadmap
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight"
          >
            Artificial Intelligence
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
              Beginner to Professional
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#94A3B8] text-lg max-w-3xl mx-auto"
          >
            Master Artificial Intelligence, Machine Learning, Deep Learning, Generative AI, and MLOps. Build real-world projects and become industry-ready.
          </motion.p>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden aspect-[21/9] mb-20 border border-[#1A1A1A] shadow-[0_0_40px_rgba(99,102,241,0.1)]"
        >
          <img 
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop" 
            alt="AI Neural Network Representation" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </motion.div>

        {/* What is AI Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Network className="w-6 h-6 text-[#6366F1]" />
                How AI Works (Architecture)
              </h2>
              <p className="text-[#94A3B8] leading-relaxed">
                Artificial Intelligence operates by ingesting large amounts of training data, analyzing the data for correlations and patterns, and using these patterns to make predictions about future states. A chatbot that is fed examples of text can learn to generate lifelike exchanges with people, or an image recognition tool can learn to identify and describe objects in images by reviewing millions of examples. 
              </p>
              <p className="text-[#94A3B8] leading-relaxed mt-4">
                At a macro architectural level, an AI system involves <strong>Data Pipelines</strong> (ETL processes), <strong>Model Training Environments</strong> (clusters of GPUs), <strong>Vector Databases</strong> (for semantic memory), and <strong>Inference Endpoints</strong> (serving the model to user applications via APIs).
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#111] p-6 rounded-xl border border-[#1A1A1A]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Advantages</h3>
              <ul className="text-sm text-[#94A3B8] space-y-2">
                <li>• Reduction in human error</li>
                <li>• Available 24/7 without fatigue</li>
                <li>• Digital assistance and automation</li>
                <li>• Accelerated decision making</li>
                <li>• Pattern identification in massive data</li>
              </ul>
            </div>
            
            <div className="bg-[#111] p-6 rounded-xl border border-[#1A1A1A]">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-rose-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Challenges</h3>
              <ul className="text-sm text-[#94A3B8] space-y-2">
                <li>• High cost of computation/GPUs</li>
                <li>• Requires massive amounts of data</li>
                <li>• Can perpetuate bias and toxicity</li>
                <li>• "Black box" interpretability issues</li>
                <li>• Security and prompt injection risks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Roadmap Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">The Complete Roadmap</h2>
            <p className="text-[#94A3B8]">Follow these phases in order to build your foundation and master advanced concepts.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aiPhases.map((phase) => (
              <motion.div 
                key={phase.id}
                whileHover={{ y: -2 }}
                className="bg-[#111] border border-[#1A1A1A] rounded-2xl p-6 md:p-8 hover:border-[#6366F1]/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#1A1A1A]">
                  <div className="w-8 h-8 rounded bg-[#6366F1]/10 flex items-center justify-center text-[#6366F1] font-bold">
                    {phase.id}
                  </div>
                  <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                </div>
                
                <div className="space-y-6">
                  {phase.items.map((item, idx) => (
                    <div key={idx}>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[#6366F1] mb-3">{item.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.topics.map((topic, tidx) => (
                          <span 
                            key={tidx}
                            className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-[#1A1A1A] text-[#94A3B8] border border-[#333]"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learning Path Flow */}
        <div className="mb-20 bg-gradient-to-br from-[#111] to-[#0A0A0A] p-8 md:p-12 rounded-2xl border border-[#1A1A1A] overflow-hidden relative">
          <Database className="absolute -right-20 -top-20 w-64 h-64 text-[#1A1A1A] opacity-50" />
          <h2 className="text-2xl font-bold text-white mb-8 relative z-10">🎯 Learning Path Progression</h2>
          <div className="flex flex-wrap items-center gap-3 relative z-10 text-sm font-bold uppercase tracking-wider text-[#94A3B8]">
            {['Python', 'Mathematics', 'Machine Learning', 'Projects', 'Deep Learning', 'PyTorch/TF', 'Computer Vision', 'NLP', 'Transformers', 'Gen AI & LLMs', 'RAG & Agents', 'MLOps & Cloud'].map((step, idx, arr) => (
              <React.Fragment key={idx}>
                <span className="px-4 py-2 bg-[#1A1A1A] rounded border border-[#333] text-white">{step}</span>
                {idx < arr.length - 1 && <ArrowRight className="w-4 h-4 text-[#6366F1]" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Final Stack */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Professional AI Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {aiFinalStack.map((stack, idx) => (
              <div key={idx} className="bg-[#111] border border-[#1A1A1A] rounded-xl p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-4">{stack.category}</h4>
                <ul className="space-y-2">
                  {stack.items.map((item, i) => (
                    <li key={i} className="text-sm text-[#94A3B8] flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#333]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Final Goals */}
        <div className="text-center bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-2xl p-10 mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">🏆 What You Will Achieve</h2>
          <p className="text-[#94A3B8] mb-8">After completing this roadmap, you will have the skills required to work as a professional AI/ML Engineer.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {['Build ML/DL Models', 'Computer Vision Systems', 'NLP Applications', 'RAG & Vector DBs', 'Custom LLM Apps', 'Deploy AI APIs', 'Fine-Tune Models', 'Agentic Workflows'].map((goal, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm font-medium text-[#F0F0F0]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{goal}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
