# MLOps Comparator 📊

A web application for visualizing and comparing machine learning experiments with an advanced performance optimization system.

## 🚀 Key Features

### 📈 Interactive Charts

- **Experiment Comparison** - visualize metrics from multiple experiments on a single chart
- **Metric Filtering** - independent visibility control for each metric
- **Adaptive Data Decimation** - performance optimization for large datasets

### ⚡ Performance Optimization System

- **5 Detail Levels:**
  - 🔍 **Overview** (~500 points) - quick trend viewing
  - 📊 **Medium** (~2K points) - balance between detail and performance
  - 🎯 **Detailed** (~8K points) - high detail level
  - 🤖 **Auto** - automatic selection of optimal point count
  - 📋 **All** - show all points (for precise analysis)

### 🎛️ Smart Data Management

- **Adaptive Decimation** with preservation of first and last points
- **Performance Indicator** (green/yellow/red)
- **Real-time Render Monitoring**
- **Automatic Animation Disabling** for large datasets

## 🛠️ Technology Stack

- **Vue.js 3** with Composition API
- **Pinia** for state management
- **Chart.js** for interactive charts
- **PrimeVue** for UI components
- **Tailwind CSS** for styling
- **Vite** as build tool

## 📁 Project Structure

```
src/
├── components/
│   ├── MainTitle.vue          # Application header
│   ├── UploadField.vue        # CSV file upload
│   ├── LogsData.vue           # Data statistics
│   ├── DataCharts.vue         # Charts container
│   ├── DataChart.vue          # Single metric component
│   ├── MetricChart.vue        # Metric chart
│   ├── ChartButton.vue        # Visibility control button
│   └── DetailControls.vue     # Detail level controls
├── stores/
│   └── experimentsStore.js    # Experiments data store
└── App.vue                    # Main component
```

## 📊 Data Format

The application works with CSV files in the following format:

```csv
experiment_id,metric_name,step,value
exp_001,accuracy,1,0.85
exp_001,accuracy,2,0.87
exp_001,loss,1,0.45
exp_002,accuracy,1,0.82
```

**Fields:**

- `experiment_id` - experiment identifier
- `metric_name` - metric name (accuracy, loss, f1_score, etc.)
- `step` - training step
- `value` - metric value at the given step

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

### Code Formatting

```bash
npm run format
```

## 🌐 Vercel Deployment

The project is configured for automatic deployment on Vercel:

1. **Connect repository** to Vercel
2. **Settings are automatically** applied from `vercel.json`
3. **Deployment happens** on every push to main branch

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📈 Usage

1. **Upload CSV file** with experiment data
2. **View statistics** - number of experiments, metrics, steps
3. **Select detail level** for optimal performance
4. **Control visibility** of experiments for each metric independently
5. **Analyze results** using interactive charts

## ⚡ Performance Optimization

### Automatic Settings:

- **≤ 1000 points** → show all
- **≤ 5000 points** → maximum 1500 points
- **≤ 15000 points** → maximum 3000 points
- **> 15000 points** → maximum 5000 points

### Adaptive Optimizations:

- Animation disabling for "All points" mode
- Increased debounce for large datasets (50-100ms)
- Point hiding when count > 100
- Independent rendering for each chart

## 🎨 UI/UX Features

- **Color-coded performance indicators** for charts
- **Real-time point counter**
- **Emoji icons** for intuitive understanding
- **Hover effects** and smooth animations
- **Extended sidebar** (20rem) for convenience

## 🔧 System Requirements

- **Node.js** ^20.19.0 || >=22.12.0
- **npm** or **yarn**
- Modern browser with ES6+ support

## 📝 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**MLOps Comparator** - a powerful tool for analyzing and comparing machine learning experiments with focus on performance and usability. 🚀
