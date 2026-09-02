export const aiPhases = [
  {
    id: "0",
    title: "PHASE 0 — PREREQUISITES",
    items: [
      {
        category: "Computer Fundamentals",
        topics: ["Computer basics", "Operating System basics", "Files & folders", "Command line / Terminal", "Internet & HTTP basics", "Git & GitHub basics"]
      },
      {
        category: "Python Programming",
        topics: ["Variables", "Data Types", "Operators", "Conditions", "Loops", "Functions", "Lambda Functions", "Lists", "Tuples", "Sets", "Dictionaries", "Strings", "List Comprehension", "Exception Handling", "File Handling", "Modules & Packages", "OOP", "Virtual Environment", "JSON", "APIs"]
      },
      {
        category: "Python Libraries",
        topics: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "SciPy"]
      }
    ]
  },
  {
    id: "1",
    title: "PHASE 1 — AI FUNDAMENTALS",
    items: [
      {
        category: "Introduction to AI",
        topics: ["What is Artificial Intelligence?", "History of AI", "Evolution of AI", "AI Applications", "Advantages & Limitations"]
      },
      {
        category: "Types of AI",
        topics: ["Narrow AI", "General AI (AGI)", "Super AI"]
      },
      {
        category: "AI vs ML vs DL",
        topics: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Generative AI"]
      },
      {
        category: "Intelligent Agents",
        topics: ["Agent", "Environment", "Perception", "Action", "Rational Agent", "Reflex Agent", "Model-Based", "Goal-Based", "Utility-Based", "Learning Agent"]
      },
      {
        category: "AI Problem Solving",
        topics: ["Problem formulation", "State space", "Initial/Goal state", "Actions", "Search"]
      }
    ]
  },
  {
    id: "2",
    title: "PHASE 2 — MATHEMATICS FOR AI",
    items: [
      { category: "Linear Algebra", topics: ["Scalars", "Vectors", "Matrices", "Addition", "Multiplication", "Transpose", "Dot Product", "Identity", "Inverse", "Rank", "Eigenvalues/vectors", "Tensors"] },
      { category: "Probability", topics: ["Probability", "Conditional", "Bayes Theorem", "Random Variables", "Distributions", "Expected Value", "Variance"] },
      { category: "Statistics", topics: ["Mean", "Median", "Mode", "Range", "Variance", "Std Deviation", "Correlation", "Covariance", "Normal Dist", "Sampling", "Hypothesis Testing", "Confidence Interval"] },
      { category: "Calculus", topics: ["Functions", "Limits", "Derivatives", "Partial", "Chain Rule", "Gradient", "Gradient Descent"] },
      { category: "Optimization", topics: ["Objective/Cost/Loss Function", "Local/Global Minimum", "Learning Rate"] }
    ]
  },
  {
    id: "3",
    title: "PHASE 3 — MACHINE LEARNING",
    items: [
      { category: "ML Fundamentals", topics: ["Dataset", "Features", "Target", "Train/Test/Val Data", "Model", "Prediction"] },
      { category: "Data Preprocessing", topics: ["Cleaning", "Missing/Duplicate Values", "Outliers", "Encoding", "Scaling (Standard, MinMax)", "Feature Engineering/Selection"] },
      { category: "Supervised Learning (Regression & Classification)", topics: ["Linear/Polynomial/Ridge/Lasso Regression", "Decision Trees", "Random Forest", "XGBoost", "LightGBM", "CatBoost", "Logistic Regression", "KNN", "SVM", "Naive Bayes"] },
      { category: "Unsupervised Learning", topics: ["K-Means", "Hierarchical", "DBSCAN", "PCA", "t-SNE", "UMAP", "Isolation Forest"] },
      { category: "Model Evaluation & Improvement", topics: ["MAE", "MSE", "R²", "Accuracy", "Precision", "Recall", "F1 Score", "ROC-AUC", "Over/Underfitting", "Cross Validation", "GridSearchCV", "Ensemble Methods"] }
    ]
  },
  {
    id: "4",
    title: "PHASE 4 — REINFORCEMENT LEARNING",
    items: [
      { category: "RL Fundamentals", topics: ["Agent", "Environment", "State", "Action", "Reward", "Policy", "Value", "Q-Value", "Episode"] },
      { category: "Important Concepts", topics: ["Markov Decision Process", "Bellman Equation", "Exploration/Exploitation", "Discount Factor"] },
      { category: "RL Algorithms", topics: ["Q-Learning", "SARSA", "Monte Carlo", "TD Learning", "DQN", "Policy Gradient", "Actor-Critic", "PPO", "DDPG", "SAC"] }
    ]
  },
  {
    id: "5",
    title: "PHASE 5 — ML ENGINEERING",
    items: [
      { category: "Engineering Practices", topics: ["Scikit-Learn Pipelines", "ColumnTransformer", "Model Serialization (Joblib, Pickle)", "Data Leakage", "Experiment Tracking", "Model Versioning/Monitoring", "Tools: Git, GitHub, Jupyter, Colab"] }
    ]
  },
  {
    id: "6",
    title: "PHASE 6 — DEEP LEARNING FUNDAMENTALS",
    items: [
      { category: "Neural Networks", topics: ["Biological vs Artificial Neuron", "Perceptron", "Weights", "Bias", "Input/Hidden/Output Layers"] },
      { category: "Concepts & Optimization", topics: ["Forward/Backpropagation", "Loss Function", "Gradient Descent", "Epoch", "Batch", "Learning Rate", "Optimizers (SGD, Adam, RMSProp)", "Regularization (L1/L2, Dropout, BatchNorm)"] },
      { category: "Activation & Loss Functions", topics: ["Sigmoid", "Tanh", "ReLU", "Softmax", "MSE", "Cross Entropy"] }
    ]
  },
  {
    id: "7",
    title: "PHASE 7 — PYTORCH / TENSORFLOW",
    items: [
      { category: "PyTorch", topics: ["Tensor Operations", "GPU/CUDA", "DataLoader", "nn.Module", "Training/Validation Loops", "Optimizers", "Saving/Loading"] },
      { category: "TensorFlow/Keras", topics: ["Sequential/Functional API", "Layers", "Model Compilation", "Training", "Evaluation"] }
    ]
  },
  {
    id: "8",
    title: "PHASE 8 — COMPUTER VISION",
    items: [
      { category: "Fundamentals & CNNs", topics: ["Image Processing", "Convolution", "Kernel", "Stride", "Padding", "Pooling", "Flatten", "CNN Architectures (ResNet, VGG, YOLO)"] },
      { category: "Tasks", topics: ["Object Detection (BBox, IoU)", "Segmentation (U-Net, Mask R-CNN)", "Face Recognition", "OCR", "Pose Estimation"] }
    ]
  },
  {
    id: "9",
    title: "PHASE 9 — NATURAL LANGUAGE PROCESSING",
    items: [
      { category: "Text Processing", topics: ["Tokenization", "Stop Words", "Stemming", "Lemmatization", "N-Grams", "Bag of Words", "TF-IDF", "Word Embeddings (Word2Vec, GloVe)"] },
      { category: "NLP Tasks", topics: ["Text Classification", "Sentiment Analysis", "Named Entity Recognition", "Question Answering", "Machine Translation"] }
    ]
  },
  {
    id: "10",
    title: "PHASE 10-13 — SEQUENCE MODELS & TRANSFORMERS",
    items: [
      { category: "Sequence Models", topics: ["RNN", "LSTM", "GRU", "Bidirectional RNN", "Seq2Seq"] },
      { category: "Transformers & Attention", topics: ["Self-Attention", "Query/Key/Value", "Multi-Head Attention", "Encoder/Decoder", "Positional Encoding", "BERT", "GPT", "ViT"] },
      { category: "Generative AI & Prompting", topics: ["LLMs", "Tokenization", "Context Window", "Temperature", "Zero/Few-Shot Prompting", "System Prompts", "Hallucination"] }
    ]
  },
  {
    id: "14",
    title: "PHASE 14-16 — RAG & AI AGENTS",
    items: [
      { category: "Vector Databases & Embeddings", topics: ["Text/Image Embeddings", "Cosine Similarity", "FAISS, Chroma, Pinecone", "Semantic/Hybrid Search"] },
      { category: "RAG (Retrieval-Augmented Gen)", topics: ["Document Loading", "Chunking", "Retrieval", "Context", "LLM Generation", "RAG Evaluation"] },
      { category: "AI Agents", topics: ["Agent Loop", "Planning/Reasoning", "Tools/Function Calling", "Multi-Agent Systems", "Guardrails"] }
    ]
  },
  {
    id: "17",
    title: "PHASE 17-20 — APP DEV & DEPLOYMENT",
    items: [
      { category: "Backend & Databases", topics: ["FastAPI", "Flask", "PostgreSQL", "MongoDB", "Redis", "REST APIs", "Auth"] },
      { category: "Deployment & MLOps", topics: ["Docker", "Linux", "AWS/GCP/Azure", "Render/Vercel", "ML Lifecycle", "CI/CD", "MLflow", "Data/Model Drift"] }
    ]
  },
  {
    id: "21",
    title: "PHASE 21-25 — ADVANCED TOPICS",
    items: [
      { category: "Fine-Tuning", topics: ["Transfer Learning", "LoRA", "QLoRA", "Quantization", "Model Compression"] },
      { category: "Advanced Models", topics: ["GANs", "Diffusion Models", "Vision-Language Models", "Contrastive Learning", "Meta Learning"] },
      { category: "AI Safety & Robotics", topics: ["AI Ethics", "Bias/Fairness", "Prompt Injection", "Explainable AI", "Robot Perception", "Motion Planning"] }
    ]
  },
  {
    id: "26",
    title: "PHASE 26 — REAL-WORLD PROJECTS",
    items: [
      { category: "Beginner", topics: ["House Price/Diabetes Prediction", "Spam Detection", "Movie Recommendation"] },
      { category: "Intermediate", topics: ["Sentiment Analysis", "Face Detection", "OCR System", "NLP Chatbot"] },
      { category: "Advanced", topics: ["PDF/RAG Chatbot", "AI Resume Analyzer", "Multi-Agent System", "AI SaaS Application"] }
    ]
  }
];

export const aiFinalStack = [
  { category: "Programming", items: ["Python", "SQL", "JavaScript"] },
  { category: "Data", items: ["NumPy", "Pandas", "Matplotlib", "SciPy"] },
  { category: "Machine Learning", items: ["Scikit-Learn", "XGBoost", "LightGBM", "CatBoost"] },
  { category: "Deep Learning", items: ["PyTorch", "TensorFlow", "Keras"] },
  { category: "Computer Vision", items: ["OpenCV", "YOLO", "CNN"] },
  { category: "NLP", items: ["NLTK", "spaCy", "Transformers"] },
  { category: "Generative AI", items: ["LLMs", "Hugging Face", "Embeddings", "RAG", "Vector Databases", "Fine-Tuning", "AI Agents"] },
  { category: "Backend & Deploy", items: ["FastAPI", "Flask", "Docker", "Linux", "Cloud", "Git/GitHub"] },
  { category: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "Vector DB"] },
  { category: "MLOps", items: ["MLflow", "DVC", "CI/CD"] }
];
