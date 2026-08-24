---
title: "Predicting House Prices with Machine Learning: A Data-Driven Approach"
categories:
  - Analytics
  - Machine Learning
  - Prediction Model
tags:
  - Python
  - pandas / numpy 
  - scikit-learn
  - XGBoost
  - seaborn / matplotlib
toc: true
toc_sticky: true
header:
  image: assets/images/teaser2.png
  caption: "Machine Learning for Real Estate"
  overlay_filter: "rgba(0, 0, 0, 0.3)"
  alt_text: "House price prediction with machine learning"
date: 2026-08-20 00:00:00 +0000
last_modified_at: "2026-08-24"
---

<!-- ═══ Post Preview ═══ -->
<div style="
  background: linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%);
  border-left: 4px solid #667eea;
  padding: 20px 24px;
  border-radius: 0 12px 12px 0;
  margin-bottom: 24px;
  font-size: 1.05em;
  line-height: 1.7;
  color: #444;
">
  🏠 <strong>Quick Summary:</strong> Building an XGBoost model to predict house prices using 79 features and 1,460 samples — from exploratory data analysis through feature engineering to a production-ready prediction pipeline.
</div>

<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
  <span style="background: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 16px; font-size: 0.85em; font-weight: 500;">🐍 Python</span>
  <span style="background: #e3f2fd; color: #1565c0; padding: 4px 12px; border-radius: 16px; font-size: 0.85em; font-weight: 500;">📊 pandas / numpy</span>
  <span style="background: #fff3e0; color: #e65100; padding: 4px 12px; border-radius: 16px; font-size: 0.85em; font-weight: 500;">🤖 scikit-learn</span>
  <span style="background: #fce4ec; color: #c62828; padding: 4px 12px; border-radius: 16px; font-size: 0.85em; font-weight: 500;">⚡ XGBoost</span>
  <span style="background: #f3e5f5; color: #6a1b9a; padding: 4px 12px; border-radius: 16px; font-size: 0.85em; font-weight: 500;">📈 seaborn / matplotlib</span>
</div>

<div style="background: #f8f9fa; border-left: 4px solid #1976d2; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
  <p style="margin: 0; font-size: 0.95em; color: #555;">
    📂 <strong>Source Code:</strong> <a href="https://github.com/trann8/House-Price" style="color: #1976d2; text-decoration: none; font-weight: 500;">View on GitHub →</a>
  </p>
</div>

## 🏠 Situation

The real estate market is one of the most valuable and complex markets in the world. For home buyers, sellers, and investors, accurately estimating a property's value is critical — yet traditional appraisal methods are often slow, subjective, and expensive. The challenge? House prices depend on dozens of interconnected factors: location, size, age, quality of materials, neighborhood characteristics, and more.

This project tackles that challenge head-on using the **Ames Iowa Housing dataset** from Kaggle's "House Prices — Advanced Regression Techniques" competition. With 1,460 training samples and **79 predictor variables**, this dataset is widely regarded as a benchmark for regression modeling in real estate analytics.

## 🎯 Task

Build a machine learning model that can accurately predict the sale price of a house given its features. The goal was to:

- **Explore** the data to understand which factors drive home values
- **Engineer meaningful features** from raw property attributes
- **Train and tune** predictive models using rigorous validation
- **Deliver actionable insights** about what makes houses more valuable

The model's performance is measured by **Root Mean Squared Error (RMSE)** on the log-transformed sale price — the same metric used in the Kaggle competition. Lower RMSE means more accurate predictions.

## 🚀 Action

### 1️⃣ Exploratory Data Analysis

Before modeling, I thoroughly explored the data to understand patterns and distributions:

- **Sale Price Distribution**: The raw sale prices showed significant right-skewness. A log-transformation (`log1p`) normalized the distribution, making it more suitable for regression modeling.
- **Correlation Analysis**: Heatmaps revealed the strongest predictors of sale price, including `OverallQual` (overall material/finish quality), `GrLivArea` (above-ground living area), and `GarageCars` (garage capacity).

![Heatmap sale price prediction](assets/images/hourly_heatmap.png)

- **Missing Data Audit**: Several features had missing values — ranging from minor gaps (`Electrical`: 0.07%) to heavy sparsity (`PoolQC`: 99.5%). Each was handled strategically based on the nature of the feature.

### 2️⃣ Feature Engineering

Raw data rarely tells the full story. I created new composite features that capture more meaningful signals:

| New Feature | Formula | Rationale |
|---|---|---|
| `TotalSF` | TotalBsmtSF + 1stFlrSF + 2ndFlrSF | Total square footage across all floors |
| `HouseAge` | YrSold − YearBuilt | How old the house is at time of sale |
| `RemodAge` | YrSold − YearRemodAdd | How long since last renovation |
| `TotalBath` | FullBath + 0.5×HalfBath + BsmtFullBath + 0.5×BsmtHalfBath | Weighted total bathroom count |
| `HasPool` | PoolArea > 0 | Binary indicator for pool ownership |

Redundant source columns were dropped to avoid multicollinearity.

### 3️⃣ Data Preprocessing Pipeline

A robust preprocessing pipeline handles both numeric and categorical features automatically:

- **Numeric features**: Missing values imputed with the median
- **Categorical features**: Missing values imputed with the most frequent value, then one-hot encoded (dropping the first category to avoid the dummy variable trap)

This pipeline is built with `scikit-learn`'s `ColumnTransformer`, ensuring consistent transformation across training and prediction.

### 4️⃣ Model Training & Hyperparameter Tuning

Two powerful regression algorithms were compared:

| Model | Algorithm | Why It Fits |
|---|---|---|
| **Random Forest** | Ensemble of decision trees | Handles non-linear relationships, robust to outliers |
| **XGBoost** | Gradient-boosted trees | State-of-the-art for tabular data, often wins Kaggle competitions |

Both models were tuned using **Randomized Search with 5-fold cross-validation**, searching over 50 random hyperparameter combinations:

- *Random Forest*: tree count (100–500), max depth (5–50), min samples split/leaf, feature selection strategy
- *XGBoost*: subsample rate, max depth, column sampling ratio, learning rate

The **XGBoost model outperformed Random Forest** on validation RMSE and was selected as the final model.

### 5️⃣ Final Model & Feature Importance

The winning XGBoost pipeline was retrained on the full training + validation set for maximum data utilization. The top predictive features by importance include:

1. **Overall Quality** — the single strongest predictor of home value
2. **Total Square Footage** — size matters across all floors
3. **Garage Capacity** — reflects both utility and luxury
4. **Above-ground Living Area** — directly tied to usable space
5. **Neighborhood** — location premium captured through encoding

![Top predictive features by importance](assets/images/top_items_bubble_chart.png)

### 6️⃣ Prediction Pipeline

For new houses, the model:
1. Applies the same feature engineering transformations
2. Runs data through the preprocessing pipeline (imputation + encoding)
3. Generates a log-scale price prediction via XGBoost
4. Inverts the log transformation (`expm1`) to return a real-world dollar value

## 📊 Result

### 📈 Model Performance

- The **XGBoost model achieved competitive RMSE** on the held-out validation set, demonstrating strong generalization
- Feature importance analysis confirmed that domain intuition (quality and size matter most) aligns with what the model learned from data
- The full pipeline — from raw CSV to dollar prediction — is automated and reproducible

### 💼 Business Value

This model demonstrates how machine learning can:

- **Accelerate property valuation** from weeks (manual appraisal) to seconds (automated prediction)
- **Surface key value drivers** that inform renovation decisions, pricing strategy, and investment analysis
- **Scale across markets** — the same methodology applies to any housing dataset with structured features

### 💡 Key Takeaways

1. **Feature engineering matters**: Composite features like `TotalSF` and `HouseAge` capture signals that raw columns miss
2. **Log-transform skewed targets**: Normalizing the target variable improves model calibration
3. **XGBoost dominates tabular regression**: Gradient boosting consistently outperforms simpler ensembles on structured data
4. **Robust preprocessing is non-negotiable**: Automated imputation and encoding ensure the model handles real-world messy data gracefully

---

*This project was built using Python, scikit-learn, XGBoost, and pandas. The full notebook and demo code are available [on GitHub](https://github.com/trann8/House-Price/blob/main/ML%20prediction.ipynb).*
