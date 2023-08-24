# Computer Vision assisted Drive-Thru Web Store with On-chain Transactions
Final Year Project - NED University of Engineering and Technology

## Demo
Link: https://youtu.be/EJOKy73AlrI

## Domain
1. Web Application
2. Computer Vision
3. Blockchain
4. Machine Learning

## Tools and Technologies
![Node JS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Mongo DB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) <a href='https://ejs.co/' target="_blank"><img alt='' src='https://img.shields.io/badge/EJS-100000?style=for-the-badge&logo=&logoColor=6F2020&labelColor=402FDD&color=B72222'/></a> ![Express JS](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JS](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![Ngrok](https://img.shields.io/badge/ngrok-1F1E37.svg?style=for-the-badge&logo=ngrok&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white) ![Plotly](https://img.shields.io/badge/Plotly-239120?style=for-the-badge&logo=plotly&logoColor=white) <a href='' target="_blank"><img alt='' src='https://img.shields.io/badge/IP_Camera-100000?style=for-the-badge&logo=&logoColor=6F2020&labelColor=402FDD&color=980FF4'/></a> <a href='https://adaptiverecognition.com/products/carmen-mobile/' target="_blank"><img alt='' src='https://img.shields.io/badge/Carmen_Mobile App-100000?style=for-the-badge&logo=&logoColor=F10F0F&labelColor=402FDD&color=519FFF'/></a> ![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white) <a href='https://metamask.io/' target="_blank"><img alt='' src='https://img.shields.io/badge/MetaMask-100000?style=for-the-badge&logo=&logoColor=6F2020&labelColor=402FDD&color=FF711F'/></a> <a href='https://docs.ethers.org/v5/' target="_blank"><img alt='' src='https://img.shields.io/badge/Ethers-100000?style=for-the-badge&logo=&logoColor=6F2020&labelColor=402FDD&color=3B1DFF'/></a> ![USDT](https://img.shields.io/badge/Tether-50AF95.svg?style=for-the-badge&logo=Tether&logoColor=white) ![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white) <a href='https://www.statsmodels.org/' target="_blank"><img alt='' src='https://img.shields.io/badge/Statsmodel-100000?style=for-the-badge&logo=&logoColor=F10F0F&labelColor=402FDD&color=519FFF'/></a>

## Problem Statement
In today’s world, people are busier than ever and the conventional model of drive-thru in which orders are placed using a microphone and picked up at the window, has become obsolete.

The main problem with this model is that during peak hours, the long line of cars waiting to drive through cause traffic disruptions, delays, and disorder.

Furthermore, many problems like delayed payments, high fees and frozen accounts surround most of centralized transaction platforms like PayPal. 

These online platforms have a single point of failure and also, the transaction data is mutable and not completely secure.

## Solution
To reduce the waiting time of customers and to increase employee productivity, our project utilizes Automatic Number Plate Recognition technology that can be used to notify the store staff of an incoming customer beforehand.

To overcome problems like data insecurity and high fees, our system uses on-chain transactions involving decentralized storage of data which allows for secure and tamper-proof record-keeping of transactions.

## Methodology
![methodology overview](https://github.com/M-Adil-AS/Computer-Vision-assisted-Drive-Thru-Web-Store-with-On-chain-Transactions/assets/115668271/dfa1d731-26f4-4f41-a587-10682983e795)

Step one: Customers place the order online and pay in crypto through a metawallet such as metamask.

Step two: After the transaction has been verified, a task to assemble the order is created in the database. This task is assigned to an assembler employee. Assemblers pack all the order items together and mark the task as completed.

Step three: Once the order has been assembled, customers are informed to pick up their order. ANPR camera is installed at a distance of a few minutes from pick-up point. The camera detects the car’s license plate and ANPR data is generated that can be automatically connected to the relevant order ID stored in the database. Upon this trigger, another task to deliver the order is created and assigned to a carrier employee.

Step four: Carrier identifies the customer's vehicle by reading ANPR data within the web application and loads the shopping bags in the car’s trunk. Finally, the customer is required to confirm the delivery.

## Application Features
1. Employee Registration by Admin.
2. Admin can update the employee’s role to suit the changing needs of the business.
3. Admin has access to view the current status of employees, their attendance, the tasks assigned to each of them and the duration they took to complete those tasks.
4. In case of an unsuccessful ANPR recognition, customers can manually notify the store staff on the app.
5. An efficient task management system which is based on first-come, first-served principle.
6. Automatic updates via Server Sent Events eliminate manual refresh to load new tasks.
7. Work-load is balanced on all employees by the system.
8. Furthermore, Admin can transfer tasks of an employee to other employees to maintain continuity of business in case of unplanned events.
9. Attendance sheet that can be used by Admin to calculate the employee’s pay based on work hours given by them.
10. Report Charts for Admin.
11. Forecasting Sales using Time Series algorithms.
12. Inventory Management.
13. Recommending Products to Customers.
14. Notifications generated for Admin.
