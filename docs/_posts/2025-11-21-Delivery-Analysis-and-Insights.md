---
title: "Delivery Performance Deep Dive: What's Driving Customer Dissatisfaction?"
categories:
  - Analytics
tags:
  - delivery
  - logistic
  - customer experience
  - data analysis
  - Python
toc: true
toc_sticky: true
header:
  image: /assets/images/teaser2.png
  caption: "Delivery Analytics & Customer Insights"
  overlay_filter: "rgba(0, 0, 0, 0.3)"
  alt_text: "Delivery performance analysis"
last_modified_at:
  date: "2026-08-24"
  label: "Updated"
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
  🚚 <strong>Quick Summary:</strong> Analyzing 60,583 delivery records to uncover the root causes of late arrivals and order inaccuracies — revealing critical insights about driver incentives, merchant reliability, and peak hour optimization.
</div>

<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
  <span style="background: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 16px; font-size: 0.85em; font-weight: 500;">🐍 Python</span>
  <span style="background: #e3f2fd; color: #1565c0; padding: 4px 12px; border-radius: 16px; font-size: 0.85em; font-weight: 500;">📦 Delivery</span>
  <span style="background: #fff3e0; color: #e65100; padding: 4px 12px; border-radius: 16px; font-size: 0.85em; font-weight: 500;">🚚 Logistics</span>
  <span style="background: #fce4ec; color: #c62828; padding: 4px 12px; border-radius: 16px; font-size: 0.85em; font-weight: 500;">🧑‍🤝‍🧑 Customer Experience</span>
  <span style="background: #f3e5f5; color: #6a1b9a; padding: 4px 12px; border-radius: 16px; font-size: 0.85em; font-weight: 500;">📊 Data Analysis</span>
</div>

<div style="background: #f8f9fa; border-left: 4px solid #1976d2; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
  <p style="margin: 0; font-size: 0.95em; color: #555;">
    📂 <strong>Source Code:</strong> <a href="https://github.com/trann8/trann8.github.io/tree/main/docs/assets/notebooks/1-Biz_strategy/Delivery_Analysis_and_Insights" style="color: #1976d2; text-decoration: none; font-weight: 500;">View on GitHub →</a>
  </p>
</div>


## ⭐ Situation
Customer dissatisfaction was rising in Cincinnati despite stable order volume. Complaints centered on late deliveries and incorrect items, especially during evening peak hours. Leadership needed a clear, data‑driven explanation of what was causing these failures across drivers, merchants, and order characteristics.

## 🎯Task
I was responsible for analyzing 60,583 delivery records to identify the root causes of late arrivals and order inaccuracies, quantify their impact, and recommend operational strategies that could improve reliability and customer experience.

## 🚨 Executive Summary

Our service is facing two critical challenges:

- **Late Deliveries (4.7%)** — driven by extreme delays in driver acceptance, especially for low-priced orders  
- **Order Accuracy (2.5%)** — compromised by grocery store partners, leading to unresolved complaints

### Recommended Actions:
1. **Restructure Driver Incentives** — make low-priced orders more attractive  
2. **Partner Success Program** — deploy DashMart’s best practices across grocery partners  
3. **Peak Hour Optimization** — boost driver supply from 19:00 to 00:00

---

## 📊 Data Quality
- **Data Quality:** High, with minor completeness issues
- **Low percentage of missing data**: `DELIV_DASHER_ID`, `DELIV_D2R`, `DELIV_CLAT` . These gaps are unlikely to affect most analyses. Therefore, I’ve chosen to drop null rows, as these fields are essential for downstream processing
- **Intentional Blanks**: `DELIV_CANCELLED_AT`, `SUBSTITUTE_ITEM_NAME`, `CATEGORY`

## 🔥 Market snapshot
- **Total Orders:** 60,583 (Sep 16–Oct 14, 2022, Cincinnati)  
- **Cancellation Rate:** 1.1%  
- **Late Delivery Rate:** 4.7%  
- **Missing/Incorrect Rate:** 2.5%  

---

## 🔥 Market Patterns & Hourly Trends

- **Order Peaks:** 23:00–03:00 and 18:00–22:59  
- **Stable Hours:** 06:00–11:00  
- **Critical Window:** 19:00–00:00 — highest concentration of late and missing deliveries  
- **Cancellations:** Low and consistent

![Hourly Heatmap](/assets/images/hourly_heatmap.png)

---

## 🧍 Customer Experience

### Order Accuracy:
- **Resolution Gap:** Only 8% of complaints were resolved with substitutions  
- **Mismatch Rate:** 166 substitute items didn’t match original category

![Substitution Accuracy](/assets/images/substitution_bar_chart.png)

### Wait Time:
- **Median Acceptance Time:** ~1.5 minutes  
- **Outliers:** Up to 120 minutes  
- **Insights:** Low-priced orders (< $0.20) ignored by drivers

![Acceptance Time Distribution](/assets/images/violin_plot_wait_time.png)

---

## 🚗 Dasher Performance

- **Travel Time Impact:** Longer store arrival → higher chance of late delivery  
![Travel Time vs Late Status](/assets/images/travel_time_late_status.png)

- **Price Sensitivity:**  
  - Orders < $0.20 → longest wait times  
  - Orders > $0.40 → fast, predictable acceptance

![Price vs Acceptance Time](/assets/images/price_acceptance_scatter.png)
![Distance vs Acceptance Time](/assets/images/Distance_acceptance_scatter.png)

---

## 🛒 Merchant Reliability

### DashMart vs Grocery Stores:
- **DashMart:**  
  - Missing Rate: 0.2%  
  - Substitution Rate: 0.1%  
- **Grocery1:**  
  - Missing Rate: 14.8%
 ![Merchant performance](/assets/images/merchant_performance.png) 

### Menu Optimization:
- Share top 5 items per top 5 categories  
- Help merchants stock popular items and improve substitutions

![Top Items Bubble Chart](/assets/images/top_items_bubble_chart.png)

---

## 🧠 Strategic Recommendations

### 1. Fix the Small Order Problem
- **Batching**: Combine small orders  
- **Minimum Fare Guarantee**  
- **Wait-Time Bonuses**

### 2. Transform Grocery Partnerships
- **Short-Term**: Launch Partner Success Program  
- **Long-Term**: Shift toward DashMart’s scalable model

### 3. Reinforce Peak Hour Operations
- **Driver Supply Surge**: Incentivize 19:00–00:00  
- **Push Notifications**: “Evening Rush Bonus”

---
