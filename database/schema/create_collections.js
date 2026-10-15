/**
 * MongoDB Schema Initialization Script for Al-Aqsha Manpower Supply
 * Database: alaqsha_manpower
 * 
 * Usage:
 *   mongosh "mongodb://localhost:27017/alaqsha_manpower" database/schema/create_collections.js
 */

const dbName = "alaqsha_manpower";
const db = db.getSiblingDB(dbName);

print(`--- Initializing Collections for Database: ${dbName} ---`);

// 1. Services Collection
db.createCollection("services", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title"],
      properties: {
        _id: { bsonType: ["objectId", "string"] },
        title: {
          bsonType: "string",
          description: "Service title is required and must be a string"
        },
        category: { bsonType: "string" },
        icon: { bsonType: "string" },
        imageUrl: { bsonType: "string" },
        description: { bsonType: "string" }
      }
    }
  }
});
print("Created collection: services");

// 2. Industries Collection
db.createCollection("industries", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name"],
      properties: {
        _id: { bsonType: ["objectId", "string"] },
        name: {
          bsonType: "string",
          description: "Industry name is required and must be a string"
        },
        icon: { bsonType: "string" },
        imageUrl: { bsonType: "string" },
        description: { bsonType: "string" }
      }
    }
  }
});
print("Created collection: industries");

// 3. Enquiries Collection
db.createCollection("enquiries", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["fullName", "email", "phone"],
      properties: {
        _id: { bsonType: ["objectId", "string"] },
        fullName: { bsonType: "string", description: "Full name is required" },
        email: { bsonType: "string", description: "Email is required" },
        phone: { bsonType: "string", description: "Phone number is required" },
        serviceRequired: { bsonType: "string" },
        sourceType: {
          bsonType: "string",
          enum: ["ENQUIRY_FORM", "GET_IN_TOUCH", "MODAL_FORM", "OTHER"],
          description: "Source type of enquiry"
        },
        message: { bsonType: "string" },
        createdAt: { bsonType: ["date", "string"] }
      }
    }
  }
});
print("Created collection: enquiries");

// 4. Job Openings Collection
db.createCollection("job_openings", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "location", "type"],
      properties: {
        _id: { bsonType: ["objectId", "string"] },
        title: { bsonType: "string", description: "Job title is required" },
        location: { bsonType: "string", description: "Job location is required" },
        type: { bsonType: "string", description: "Job type (e.g. Full-time, Contract)" },
        salary: { bsonType: "string" },
        requirements: { bsonType: "string" },
        deadline: { bsonType: ["date", "string"] }
      }
    }
  }
});
print("Created collection: job_openings");

// 5. Job Applications Collection
db.createCollection("job_applications", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["jobId", "fullName", "email", "phone"],
      properties: {
        _id: { bsonType: ["objectId", "string"] },
        jobId: { bsonType: "string", description: "Job ID reference is required" },
        jobTitle: { bsonType: "string" },
        fullName: { bsonType: "string", description: "Applicant full name is required" },
        email: { bsonType: "string", description: "Applicant email is required" },
        phone: { bsonType: "string", description: "Applicant phone number is required" },
        experience: { bsonType: "string" },
        message: { bsonType: "string" },
        resumeFileName: { bsonType: "string" },
        createdAt: { bsonType: ["date", "string"] }
      }
    }
  }
});
print("Created collection: job_applications");

// 6. Contact Info Collection
db.createCollection("contact_info", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        _id: { bsonType: ["objectId", "string"] },
        phonePrimary: { bsonType: "string" },
        phoneSecondary: { bsonType: "string" },
        emailPrimary: { bsonType: "string" },
        emailSecondary: { bsonType: "string" },
        address: { bsonType: "string" },
        workingHoursWeekdays: { bsonType: "string" },
        workingHoursWeekend: { bsonType: "string" }
      }
    }
  }
});
print("Created collection: contact_info");

print("--- Collections Created Successfully ---");
