cmdpyiwn30001v63s18xs7wf1
---

# 📘 CA Digitalization Platform – API Docs


## 📌 Base URL

```
http://localhost:8080/api/v1
```

---

## 🔐 Auth Routes

### `POST /auth/signup`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Strong@123",
  "phone": "9876543210",
  "role": "CA"
}
```

### `POST /auth/signin`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "Strong@123"
}
```

---

## 👥 Client Routes

> 🔒 All require JWT in `Authorization` header

### INDIVIDUAL CLIENT

| Method | Endpoint                 | Params | Body                     |
| ------ | ------------------------ | ------ | ------------------------ |
| POST   | `/client/individual`     | –      | `IndividualClientSchema` |
| GET    | `/client/individual/:id` | `id`   | –                        |
| GET    | `/client/individual`     | –      | –                        |
| PUT    | `/client/individual/:id` | `id`   | `IndividualClientSchema` |
| DELETE | `/client/individual/:id` | `id`   | –                        |

**Sample Request Body (Individual):**

```json
{
  "fullName": "Jane Smith",
  "gender": "FEMALE",
  "dob": "2000-05-20",
  "panNumber": "ABCDE1234F",
  "aadhaarNumber": "123456789012",
  "contactEmail": "jane@example.com",
  "contactPhone": "9876543210",
  "presentAddress": "123 Street",
  "permanentAddress": "456 Street",
  "officeAddress": "789 Street"
}
```

---

### ORGANIZATION CLIENT

| Method | Endpoint                   | Params | Body        |
| ------ | -------------------------- | ------ | ----------- |
| POST   | `/client/organization`     | –      | `OrgSchema` |
| GET    | `/client/organization/:id` | `id`   | –           |
| GET    | `/client/organization`     | –      | –           |
| PUT    | `/client/organization/:id` | `id`   | `OrgSchema` |
| DELETE | `/client/organization/:id` | `id`   | –           |

**Sample Request Body (Org):**

```json
{
  "businessName": "ABC Pvt Ltd",
  "entityType": "PVT_LTD",
  "incorporationDate": "2020-01-01",
  "panNumber": "ABCDE1234F",
  "aadhaarNumber": "123456789012",
  "gstNumber": "22ABCDE1234F1Z5"
}
```

---

## 📁 Document Routes

> 🔒 All require JWT in `Authorization` header

### `POST /document/upload/:clientDetailsId`

* **Params:** `clientDetailsId`
* **Body (FormData):**

  * `document` (file)
  * `type`: `"AADHAAR" | "PAN" | "GST_CERT" | "CIN_DOC" | "ITR_ACK" | "FINANCIALS" | "OTHER"`

### `DELETE /document/:documentId`

* **Params:** `documentId`

---

## 📄 Invoice Routes

> 🔒 All require JWT in `Authorization` header

### `POST /invoice/:clientId`

* **Params:** `clientId`
* **Body:** `CreateInvoiceSchema`

### `PUT /invoice/:invoiceId`

* **Params:** `invoiceId`
* **Body:** `CreateInvoiceSchema`

### `DELETE /invoice/:invoiceId`

* **Params:** `invoiceId`

**Sample Request Body:**

```json
{
  "invoiceNumber": "INV001",
  "dueDate": "2024-08-01",
  "items": [
    {
      "description": "Consultation",
      "quantity": 1,
      "unitPrice": 1000,
      "amount": 1000
    }
  ],
  "totalAmount": 1000,
  "taxAmount": 180,
  "grandTotal": 1180,
  "status": "ISSUED",
  "paymentMethod": "UPI",
  "paymentDate": "2024-08-02",
  "notes": "Thank you"
}
```

---

## ⏳ Compliance Routes

> 🔒 All require JWT in `Authorization` header

### `POST /compliance/:clientId/create`

* **Params:** `clientId`
* **Body:**

```json
{
  "type": "ITR",
  "dueDate": "2024-12-31",
  "filedOn": "2024-12-30",
  "status": "FILED",
  "remarks": "Filed on time"
}
```

### `PUT /compliance/:complianceId`

* **Params:** `complianceId`
* **Body:** Same as above

### `DELETE /compliance/:complianceId`

* **Params:** `complianceId`

---

## 🛡️ Auth Middleware

All routes except `/auth/*` are protected. Include:

```
Authorization: Bearer <access_token>
```

---

