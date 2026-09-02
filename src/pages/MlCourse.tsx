import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, BrainCircuit, LineChart, Target, Settings, Layers, 
  ShieldAlert, CheckCircle2, FileCode2, ArrowRight, Zap, Network, 
  Cpu, Code, Terminal, Server, Boxes
} from 'lucide-react';
import { mlProjects } from '../data/mlProjectsData';

export default function MlCourse() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] font-sans pt-24 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs font-bold uppercase tracking-wider mb-6 border border-[#10B981]/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            <BrainCircuit className="w-4 h-4" />
            Ultimate Machine Learning Masterclass
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight"
          >
            Machine Learning
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#3B82F6] to-[#8B5CF6]">
              From Data to Deployment
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#94A3B8] text-lg max-w-3xl mx-auto"
          >
            A highly visual, step-by-step masterclass. Master Pandas, Scikit-Learn, Hyperparameter Tuning, and production MLOps. Includes a vault of 145 real-world projects.
          </motion.p>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden aspect-[21/9] lg:aspect-[3/1] mb-24 border border-[#1A1A1A] shadow-[0_0_50px_rgba(16,185,129,0.1)] group"
        >
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop" 
            alt="AI Motherboard and Technology" 
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">The Intelligence Engine</h3>
              <p className="text-[#94A3B8] max-w-lg text-sm">Machine learning algorithms find mathematical patterns in massive datasets, turning raw information into predictive power.</p>
            </div>
            <div className="hidden md:flex gap-2">
              <span className="px-3 py-1 bg-black/50 backdrop-blur border border-white/10 rounded text-xs font-bold text-[#10B981]">y = mx + b</span>
              <span className="px-3 py-1 bg-black/50 backdrop-blur border border-white/10 rounded text-xs font-bold text-[#3B82F6]">∇J(θ)</span>
            </div>
          </div>
        </motion.div>

        {/* 1. Data Engineering Diagram */}
        <section className="mb-24 relative">
          <div className="absolute -left-32 top-10 w-64 h-64 bg-[#3B82F6]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">1. Data Engineering Pipeline</h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">Garbage in, garbage out. The foundation of every powerful ML model is perfectly cleaned, encoded, and scaled data.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 mb-8 relative z-10">
            {/* Step 1 */}
            <div className="flex-1 bg-[#111] p-6 rounded-xl border border-[#1A1A1A] relative hover:border-[#3B82F6]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center mb-4"><Database className="w-5 h-5" /></div>
              <h3 className="font-bold text-white mb-2">1. Inspection</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Use Pandas: <code className="text-[#3B82F6]">df.info()</code>, <code className="text-[#3B82F6]">df.describe()</code>. Check for missing values (<code className="text-white">NaN</code>) and duplicates.
              </p>
            </div>
            
            <div className="hidden md:flex items-center justify-center text-[#333]"><ArrowRight className="w-6 h-6" /></div>

            {/* Step 2 */}
            <div className="flex-1 bg-[#111] p-6 rounded-xl border border-[#1A1A1A] relative hover:border-[#10B981]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mb-4"><ShieldAlert className="w-5 h-5" /></div>
              <h3 className="font-bold text-white mb-2">2. Cleaning</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Handle Missing Values: Drop them or use <code className="text-[#10B981]">SimpleImputer</code> (Mean, Median, Mode). Remove duplicates & outliers.
              </p>
            </div>

            <div className="hidden md:flex items-center justify-center text-[#333]"><ArrowRight className="w-6 h-6" /></div>

            {/* Step 3 */}
            <div className="flex-1 bg-[#111] p-6 rounded-xl border border-[#1A1A1A] relative hover:border-[#A855F7]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#A855F7]/10 text-[#A855F7] flex items-center justify-center mb-4"><Code className="w-5 h-5" /></div>
              <h3 className="font-bold text-white mb-2">3. Encoding</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Convert text to numbers. <code className="text-[#A855F7]">OneHotEncoder</code> (No order, e.g., City). <code className="text-[#A855F7]">OrdinalEncoder</code> (Order, e.g., Low/High).
              </p>
            </div>

            <div className="hidden md:flex items-center justify-center text-[#333]"><ArrowRight className="w-6 h-6" /></div>

            {/* Step 4 */}
            <div className="flex-1 bg-[#111] p-6 rounded-xl border border-[#1A1A1A] relative hover:border-[#F59E0B]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center mb-4"><LineChart className="w-5 h-5" /></div>
              <h3 className="font-bold text-white mb-2">4. Scaling</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                <code className="text-[#F59E0B]">StandardScaler</code> (Mean 0, Std 1) or <code className="text-[#F59E0B]">MinMaxScaler</code> (0 to 1). Crucial for KNN and Neural Networks.
              </p>
            </div>
          </div>
          
          {/* Data Leakage Warning */}
          <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#333] flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0 border border-rose-500/30">
              <ShieldAlert className="w-8 h-8 text-rose-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">CRITICAL: Prevent Data Leakage</h3>
              <p className="text-sm text-[#94A3B8]">
                Never call <code className="text-rose-400 font-bold bg-rose-400/10 px-1 rounded">fit_transform()</code> on your entire dataset before splitting! 
                Always split your data into <code className="text-white">X_train</code> and <code className="text-white">X_test</code> first. 
                Then, <code className="text-emerald-400 bg-emerald-400/10 px-1 rounded">fit</code> your scalers ONLY on the training data, and use <code className="text-emerald-400 bg-emerald-400/10 px-1 rounded">transform</code> on the test data.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Math & Mechanics */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">2. The Mathematics of Learning</h2>
            <p className="text-[#94A3B8]">How does the machine actually "learn"? It minimizes errors using calculus.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Linear Regression Math */}
            <div className="bg-[#111] p-8 rounded-2xl border border-[#1A1A1A]">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#3B82F6]" />
                Linear Regression & Best Fit
              </h3>
              <div className="bg-[#0A0A0A] p-6 rounded-xl border border-[#1A1A1A] mb-6 font-mono text-center">
                <span className="text-2xl text-white">y = <span className="text-[#3B82F6]">m</span>x + <span className="text-[#10B981]">b</span></span>
              </div>
              <ul className="space-y-4 text-sm text-[#94A3B8]">
                <li><strong className="text-white">y:</strong> The Target (e.g., Price)</li>
                <li><strong className="text-white">x:</strong> The Feature (e.g., Area)</li>
                <li><strong className="text-[#3B82F6]">m (Slope):</strong> How much `y` changes when `x` increases by 1.</li>
                <li><strong className="text-[#10B981]">b (Intercept):</strong> The baseline value of `y` when `x` is 0.</li>
                <li><strong className="text-rose-400">Residual (Error):</strong> The difference between the actual value and the predicted best-fit line.</li>
              </ul>
            </div>

            {/* Gradient Descent Visual */}
            <div className="bg-[#111] p-8 rounded-2xl border border-[#1A1A1A] relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#A855F7]/10 blur-3xl rounded-full" />
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 relative z-10">
                <Network className="w-5 h-5 text-[#A855F7]" />
                Gradient Descent
              </h3>
              <p className="text-sm text-[#94A3B8] mb-6 relative z-10">An optimization algorithm used to find the parameters (weights) that minimize the Cost Function (Error).</p>
              
              {/* SVG Diagram */}
              <div className="w-full h-40 bg-[#0A0A0A] rounded-xl border border-[#1A1A1A] relative flex items-center justify-center p-4">
                <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                  {/* Parabola */}
                  <path d="M 20 20 Q 100 120 180 20" stroke="#333" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                  <path d="M 20 20 Q 100 120 180 20" stroke="url(#grad)" strokeWidth="4" fill="none" strokeLinecap="round" />
                  
                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                  
                  {/* The Ball/Step */}
                  <circle cx="45" cy="53" r="6" fill="#A855F7" className="animate-pulse" />
                  
                  {/* Arrows indicating movement */}
                  <path d="M 55 65 L 75 80" stroke="#A855F7" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#A855F7" />
                    </marker>
                  </defs>
                  
                  {/* Global Minimum Text */}
                  <text x="100" y="95" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">Global Minimum (Lowest Error)</text>
                </svg>
              </div>
              
              <div className="mt-4 p-3 bg-[#1A1A1A] rounded border border-[#333] text-xs font-mono text-[#A855F7] text-center">
                θ_new = θ_old - (Learning_Rate × Gradient)
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE ALGORITHM VAULT - HIGHLIGHTED */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <motion.div
              animate={{ 
                boxShadow: ["0 0 0px rgba(16,185,129,0)", "0 0 20px rgba(16,185,129,0.5)", "0 0 0px rgba(16,185,129,0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block px-4 py-1 rounded-full border border-[#10B981] bg-[#10B981]/10 text-[#10B981] text-xs font-bold uppercase tracking-widest mb-4"
            >
              Core Models
            </motion.div>
            <h2 className="text-4xl font-black text-white mb-4">The Algorithm Vault</h2>
            <p className="text-[#94A3B8]">The specific models you will train using <code className="text-white">model.fit(X, y)</code>. Choose the right weapon for your data.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Regression */}
            <div className="bg-[#111] border border-[#3B82F6]/30 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] mb-6 group-hover:scale-110 transition-transform"><LineChart className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Regression</h3>
              <p className="text-xs text-[#94A3B8] mb-6">Predicts continuous numbers (e.g., Price, Salary, Age).</p>
              <ul className="space-y-3">
                <li className="text-sm font-bold text-[#F0F0F0] bg-[#1A1A1A] px-3 py-2 rounded border border-[#333]">Linear Regression</li>
                <li className="text-sm font-bold text-[#F0F0F0] bg-[#1A1A1A] px-3 py-2 rounded border border-[#333]">Ridge & Lasso (L1/L2)</li>
                <li className="text-sm font-bold text-[#F0F0F0] bg-[#1A1A1A] px-3 py-2 rounded border border-[#333]">SVR (Support Vector Regressor)</li>
              </ul>
            </div>

            {/* Classification */}
            <div className="bg-[#111] border border-[#10B981]/30 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981] mb-6 group-hover:scale-110 transition-transform"><Layers className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Classification</h3>
              <p className="text-xs text-[#94A3B8] mb-6">Predicts categories (e.g., Spam/Not Spam, Disease).</p>
              <ul className="space-y-3">
                <li className="text-sm font-bold text-[#F0F0F0] bg-[#1A1A1A] px-3 py-2 rounded border border-[#333]">Logistic Regression</li>
                <li className="text-sm font-bold text-[#F0F0F0] bg-[#1A1A1A] px-3 py-2 rounded border border-[#333]">KNN (K-Nearest Neighbors)</li>
                <li className="text-sm font-bold text-[#F0F0F0] bg-[#1A1A1A] px-3 py-2 rounded border border-[#333]">Naive Bayes (Probability)</li>
              </ul>
            </div>

            {/* Trees & Boosting */}
            <div className="bg-[#111] border border-[#F59E0B]/30 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] mb-6 group-hover:scale-110 transition-transform"><Network className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Trees & Ensembles</h3>
              <p className="text-xs text-[#94A3B8] mb-6">Powerful models combining many trees. Best for tabular data.</p>
              <ul className="space-y-3">
                <li className="text-sm font-bold text-[#F0F0F0] bg-[#1A1A1A] px-3 py-2 rounded border border-[#F59E0B]/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]">Random Forest</li>
                <li className="text-sm font-bold text-[#F0F0F0] bg-[#1A1A1A] px-3 py-2 rounded border border-[#F59E0B]/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]">XGBoost & LightGBM</li>
                <li className="text-sm font-bold text-[#F0F0F0] bg-[#1A1A1A] px-3 py-2 rounded border border-[#333]">Decision Trees</li>
              </ul>
            </div>

            {/* Unsupervised */}
            <div className="bg-[#111] border border-[#A855F7]/30 rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#A855F7]/20 flex items-center justify-center text-[#A855F7] mb-6 group-hover:scale-110 transition-transform"><Boxes className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-white mb-2">Unsupervised</h3>
              <p className="text-xs text-[#94A3B8] mb-6">Finds hidden structures in unlabeled data (No Target `y`).</p>
              <ul className="space-y-3">
                <li className="text-sm font-bold text-[#F0F0F0] bg-[#1A1A1A] px-3 py-2 rounded border border-[#333]">K-Means Clustering</li>
                <li className="text-sm font-bold text-[#F0F0F0] bg-[#1A1A1A] px-3 py-2 rounded border border-[#333]">PCA (Dimensionality)</li>
                <li className="text-sm font-bold text-[#F0F0F0] bg-[#1A1A1A] px-3 py-2 rounded border border-[#333]">Isolation Forest (Anomaly)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Evaluation & Tuning */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#1A1A1A] flex items-center justify-center text-[#10B981]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-white">4. Evaluation & Tuning</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Confusion Matrix Visual */}
            <div className="bg-[#111] rounded-2xl border border-[#1A1A1A] p-8">
              <h3 className="text-lg font-bold text-white mb-2">Confusion Matrix (Classification)</h3>
              <p className="text-sm text-[#94A3B8] mb-6">Visualizes model prediction accuracy versus actual truth.</p>
              
              <div className="grid grid-cols-2 gap-2 text-center text-sm font-bold">
                <div className="bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] p-6 rounded-tl-xl flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/20 to-transparent opacity-50" />
                  <span className="text-2xl mb-1 relative z-10">TP</span>
                  <span className="text-[10px] uppercase relative z-10">True Positive (Correct)</span>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-6 rounded-tr-xl flex flex-col justify-center">
                  <span className="text-2xl mb-1">FP</span>
                  <span className="text-[10px] uppercase">False Positive (False Alarm)</span>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-6 rounded-bl-xl flex flex-col justify-center">
                  <span className="text-2xl mb-1">FN</span>
                  <span className="text-[10px] uppercase">False Negative (Missed)</span>
                </div>
                <div className="bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] p-6 rounded-br-xl flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tl from-[#10B981]/20 to-transparent opacity-50" />
                  <span className="text-2xl mb-1 relative z-10">TN</span>
                  <span className="text-[10px] uppercase relative z-10">True Negative (Correct)</span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#94A3B8]">
                <span className="bg-[#1A1A1A] px-3 py-1.5 rounded border border-[#333]"><strong className="text-white">Precision:</strong> TP / (TP+FP)</span>
                <span className="bg-[#1A1A1A] px-3 py-1.5 rounded border border-[#333]"><strong className="text-white">Recall:</strong> TP / (TP+FN)</span>
                <span className="bg-[#1A1A1A] px-3 py-1.5 rounded border border-[#333]"><strong className="text-white">F1 Score:</strong> Harmonic Mean</span>
              </div>
            </div>

            {/* Tuning & Overfitting */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#111] rounded-2xl border border-[#1A1A1A] p-8 flex-1">
                <h3 className="text-lg font-bold text-white mb-4">GridSearchCV & Hyperparameters</h3>
                <p className="text-sm text-[#94A3B8] mb-4">
                  Unlike model parameters (learned via Data), hyperparameters are set <em className="text-white font-bold">before</em> training (e.g., <code className="text-[#3B82F6]">max_depth</code>, <code className="text-[#3B82F6]">learning_rate</code>).
                </p>
                <p className="text-sm text-[#94A3B8]">
                  <strong className="text-white">GridSearchCV</strong> systematically tests every specified combination of hyperparameters to find the optimal model setup, using K-Fold Cross Validation to ensure it doesn't overfit.
                </p>
              </div>

              <div className="bg-gradient-to-r from-rose-500/10 to-[#111] rounded-2xl border border-rose-500/20 p-6 flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-rose-400 mb-1">Overfitting (High Variance)</h4>
                  <p className="text-xs text-[#94A3B8]">Model memorizes training noise and performs terribly on unseen test data. <strong className="text-white">Fixes:</strong> Regularization (L1/L2), Add Data, Prune Trees, Dropout.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Production & MLOps */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#1A1A1A] flex items-center justify-center text-[#F59E0B]">
              <Server className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-white">5. Production & MLOps</h2>
          </div>

          <div className="bg-[#111] rounded-2xl border border-[#1A1A1A] p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4 text-center">1. Pipeline</h3>
                <div className="bg-[#1A1A1A] border border-[#333] p-4 rounded-xl text-center">
                  <p className="text-sm text-[#94A3B8] mb-3">Chain preprocessing and modeling into one object.</p>
                  <code className="text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded text-xs">Pipeline([scaler, model])</code>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4 text-center">2. Save Model</h3>
                <div className="bg-[#1A1A1A] border border-[#333] p-4 rounded-xl text-center">
                  <p className="text-sm text-[#94A3B8] mb-3">Export the full pipeline to disk.</p>
                  <code className="text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-1 rounded text-xs">joblib.dump(model, 'model.pkl')</code>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4 text-center">3. Deploy API</h3>
                <div className="bg-[#1A1A1A] border border-[#333] p-4 rounded-xl text-center">
                  <p className="text-sm text-[#94A3B8] mb-3">Serve the model via REST API.</p>
                  <code className="text-[#A855F7] bg-[#A855F7]/10 px-2 py-1 rounded text-xs">FastAPI / Flask / Docker</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Projects Vault */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">The 145 Projects Vault</h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">From basic Linear Regression to advanced Multi-Agent systems. This is the complete portfolio blueprint to land an ML Engineering role.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mlProjects.map((section, idx) => (
              <div 
                key={idx} 
                className={`bg-[#111] border rounded-2xl p-6 transition-colors ${
                  idx === mlProjects.length - 1 
                  ? 'border-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.1)] lg:col-span-3 md:col-span-2' 
                  : 'border-[#1A1A1A] hover:border-[#333]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider ${idx === mlProjects.length - 1 ? 'text-[#10B981]' : 'text-[#6366F1]'}`}>
                    {section.level}
                  </span>
                  {idx === mlProjects.length - 1 && <span className="flex h-3 w-3"><span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#10B981] opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span></span>}
                </div>
                <h3 className={`text-xl font-bold mb-1 ${idx === mlProjects.length - 1 ? 'text-white text-2xl' : 'text-white'}`}>
                  {section.title}
                </h3>
                <p className="text-xs text-[#94A3B8] mb-4 pb-4 border-b border-[#1A1A1A]">{section.description}</p>
                
                <ul className="space-y-2">
                  {section.projects.map((proj, i) => (
                    <li key={i} className="text-sm text-[#94A3B8] flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${idx === mlProjects.length - 1 ? 'bg-[#10B981]' : 'bg-[#333]'}`} />
                      <span className={idx === mlProjects.length - 1 ? 'text-[#F0F0F0]' : ''}>{proj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
