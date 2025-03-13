# technical-test-backend

# Data Kepegawaian API

## **1. Project Overview**
Sebuah sistem backend berbasis **Node.js (Express & Sequelize)** dengan database **PostgreSQL** untuk mengelola data kepegawaian. Proyek ini mencakup CRUD, validasi data, migrasi database, seeder, raw query, serta deployment dengan Docker.

---

## **2. Tech Stack**
- **Backend:** Node.js (Express.js)  
- **ORM:** Sequelize  
- **Database:** PostgreSQL  
- **Containerization:** Docker  
- **API Testing:** Postman  
- **Version Control:** Git  

---

## **3. Project Structure**
```
📂 data-kepegawaian-api  
│── 📁 src  
│   │── 📁 models          # ORM Models  
│   │── 📁 migrations      # Sequelize Migrations  
│   │── 📁 seeders         # Seeder Data  
│   │── 📁 controllers     # Business Logic  
│   │── 📁 routes          # API Routes  
│   │── 📁 middleware      # Middleware (Validation, Auth, etc.)  
│   │── 📁 config          # Database Configuration  
│── 📁 raw_query           # SQL Query Files  
│── 📁 work_sheet          # References (ChatGPT screenshots, Stack Overflow links, etc.)  
│── postman_collection.json # API Testing Collection  
│── Dockerfile            # Docker Setup  
│── README.md             # Project Documentation  
│── package.json          # Node Dependencies  
│── .env.example          # Environment Variables (Template)  
```

---

## **4. Installation & Setup**

### **Prerequisites**  
- Node.js vXX.X.X  
- PostgreSQL vXX.X  
- Docker (optional)  

### **1️⃣ Clone Repository**  
```sh
git clone https://github.com/yourusername/data-kepegawaian-api.git
cd data-kepegawaian-api
```

### **2️⃣ Install Dependencies**  
```sh
npm install
```

### **3️⃣ Setup Environment Variables**  
Buat file **.env** dan isi berdasarkan **.env.example**  
```env
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=data_kepegawaian
```

## **4. API Endpoints**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/employees` | GET | Get all employees (with profile, family, education) |
| `/employees/:id` | GET | Get one employee (with relations) |
| `/employees` | POST | Create employee (with profile, family, education) |
| `/employees/:id` | PUT | Update employee data |
| `/employees/:id` | DELETE | Delete employee |
| `/employees/report` | GET | Generate employee report |

---

