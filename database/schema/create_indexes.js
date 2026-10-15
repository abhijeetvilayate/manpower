/**
 * MongoDB Indexes & Auto-Increment Counter Script for Al-Aqsha Manpower Supply
 * Replaces Oracle/SQL Sequences and Identity constraints
 * Database: alaqsha_manpower
 * 
 * Usage:
 *   mongosh "mongodb://localhost:27017/alaqsha_manpower" 02_create_indexes.js
 */

const dbName = "alaqsha_manpower";
const db = db.getSiblingDB(dbName);

print(`--- Creating Indexes & Sequence Counters for Database: ${dbName} ---`);

// 1. Services Indexes
db.services.createIndex({ title: 1 }, { unique: true });
db.services.createIndex({ category: 1 });
print("Created indexes on: services (title [unique], category)");

// 2. Industries Indexes
db.industries.createIndex({ name: 1 }, { unique: true });
print("Created indexes on: industries (name [unique])");

// 3. Enquiries Indexes
db.enquiries.createIndex({ createdAt: -1 });
db.enquiries.createIndex({ email: 1 });
db.enquiries.createIndex({ sourceType: 1 });
print("Created indexes on: enquiries (createdAt [-1], email, sourceType)");

// 4. Job Openings Indexes
db.job_openings.createIndex({ type: 1 });
db.job_openings.createIndex({ deadline: 1 });
print("Created indexes on: job_openings (type, deadline)");

// 5. Job Applications Indexes
db.job_applications.createIndex({ jobId: 1 });
db.job_applications.createIndex({ email: 1 });
db.job_applications.createIndex({ createdAt: -1 });
print("Created indexes on: job_applications (jobId, email, createdAt [-1])");

// 6. Contact Info Indexes
db.contact_info.createIndex({ id: 1 }, { unique: true, sparse: true });
print("Created index on: contact_info (id [unique])");

// 7. Optional Sequence Counter Collection (for custom numeric IDs if required)
// Note: MongoDB natively uses ObjectId strings (e.g., "64f1a2b3c4d5e6f7a8b9c0d1"),
// but if human-readable numeric IDs are needed, this collection manages atomic counters.
db.createCollection("counters");
db.counters.updateOne(
  { _id: "enquiry_seq" },
  { $setOnInsert: { seq: 1000 } },
  { upsert: true }
);
db.counters.updateOne(
  { _id: "job_app_seq" },
  { $setOnInsert: { seq: 1000 } },
  { upsert: true }
);
print("Initialized atomic counters collection for custom numeric sequences.");

print("--- Indexes & Sequences Configured Successfully ---");
