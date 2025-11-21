📦 Project Overview:
    This project analyzes delivery order data from Cincinnati over a 30-day period, spanning September 16 to October 14, 2022. The dataset contains 60,583 entries across 19 columns, covering order details, delivery timestamps, driver assignments, and grocery partner performance.

🚨 Business problem: 
    The service is facing two critical operational challenges that significantly impact on customer 
    experience:  
        1. Delivery timeliness:  The overall late delivery rate stands at 4.7%, driven primarily by extreme delays in driver acceptance for low-priced orders. 
        2. Order accuracy: The order accuracy is severely compromised by our grocery store partners, leading 
        to a high volume of poorly resolved customer complaints.

✅ Recommendations:
    To address these issues, I recommend three key strategies: 
        1. Restructure Driver Incentives: Make low-priced orders economically attractive to drivers 
        to eliminate extreme acceptance delays. 
        2. Improve Grocery Partner Operations: Implement a "Partner Success Program" to deploy 
        DashMart's best practices for inventory and fulfillment across the grocery vertical. 
        3. Optimize Peak Hour Logistics (19:00–00:00): Increase driver supply through targeted incentives during 
        the critical hour window to mitigate service strain. 
    These strategies aim to improve delivery speed, order accuracy, and customer satisfaction, while laying the foundation for a scalable and resilient service model.

🧰 Tool Used:
    Pandas for data cleaning, transformation, and exploratory analysis
    Seaborn for visualizing delivery patterns, delay distributions, and complaint trends

📁 Repository Structure:
    ├── data/                   # Raw datasets
    ├── notebooks/              # Jupyter notebooks for analysis and visualization
    ├── post/                   # Key project insights and takeaways
    ├── README.md               # Project overview and business context