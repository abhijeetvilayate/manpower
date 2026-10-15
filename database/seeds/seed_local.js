/**
 * Node.js Local MongoDB Seeder Script for Al-Aqsha Manpower Supply
 * Database: mongodb://localhost:27017/alaqsha_manpower
 * 
 * Run with:
 *   node database/seeds/seed_local.js
 */

const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/alaqsha_manpower";

async function runLocalSeed() {
  const client = new MongoClient(uri);

  try {
    console.log("[Local MongoDB Seeder] Connecting to local MongoDB server...");
    await client.connect();
    console.log("[Local MongoDB Seeder] Connected successfully to localhost:27017!");

    const db = client.db("alaqsha_manpower");

    // 1. Highlight Features
    const highlightFeatures = [
      { _id: "hf_001", title: "Quality Workforce", iconClass: "bi-person-check", displayOrder: 1, isActive: "Y" },
      { _id: "hf_002", title: "Timely Delivery", iconClass: "bi-clock-history", displayOrder: 2, isActive: "Y" },
      { _id: "hf_003", title: "Cost Effective", iconClass: "bi-cash-coin", displayOrder: 3, isActive: "Y" },
      { _id: "hf_004", title: "100% Client Satisfaction", iconClass: "bi-shield-check", displayOrder: 4, isActive: "Y" }
    ];
    for (const hf of highlightFeatures) {
      await db.collection("highlight_features").updateOne({ _id: hf._id }, { $set: hf }, { upsert: true });
    }
    console.log(`[Local MongoDB Seeder] Seeded ${highlightFeatures.length} Highlight Features.`);

    // 2. Services
    const services = [
      {
        _id: "srv_001",
        title: "Skilled Manpower Supply",
        slug: "skilled-manpower-supply",
        category: "Technical & Professional",
        icon: "UserCheck",
        imageUrl: "/assets/images/services/skilled-manpower.jpg",
        description: "Certified engineers, technicians, machine operators, and skilled tradesmen vetted for Gulf standards.",
        displayOrder: 1,
        isActive: "Y"
      },
      {
        _id: "srv_002",
        title: "Unskilled Manpower Supply",
        slug: "unskilled-manpower-supply",
        category: "General Labor",
        icon: "Users",
        imageUrl: "/assets/images/services/unskilled-manpower.jpg",
        description: "Reliable, hard-working general labor and helper workforce for large-scale construction and industrial projects.",
        displayOrder: 2,
        isActive: "Y"
      },
      {
        _id: "srv_003",
        title: "Technical Manpower Supply",
        slug: "technical-manpower-supply",
        category: "Engineering & Maintenance",
        icon: "Wrench",
        imageUrl: "/assets/images/services/technical-manpower.jpg",
        description: "Specialized technical talent including electrical, instrumentation, mechanical, and safety inspectors.",
        displayOrder: 3,
        isActive: "Y"
      },
      {
        _id: "srv_004",
        title: "Project-based Manpower Supply",
        slug: "project-based-manpower-supply",
        category: "Turnkey Workforce",
        icon: "Briefcase",
        imageUrl: "/assets/images/services/project-manpower.jpg",
        description: "Flexible, scalable staffing deployments tailored to strict deadlines and specific contract milestones.",
        displayOrder: 4,
        isActive: "Y"
      },
      {
        _id: "srv_005",
        title: "Recruitment Process Outsourcing",
        slug: "recruitment-process-outsourcing",
        category: "HR & Recruitment",
        icon: "FileCheck",
        imageUrl: "/assets/images/services/recruitment-rpo.jpg",
        description: "End-to-end talent acquisition, skill verification, compliance management, and on-ground onboarding.",
        displayOrder: 5,
        isActive: "Y"
      },
      {
        _id: "srv_006",
        title: "Visa & Travel Assistance",
        slug: "visa-and-travel-assistance",
        category: "Government Relations & Mobility",
        icon: "Globe",
        imageUrl: "/assets/images/services/visa-travel.jpg",
        description: "Comprehensive support handling work permits, embassy clearances, medical tests, and ticketing logistics.",
        displayOrder: 6,
        isActive: "Y"
      }
    ];
    for (const srv of services) {
      await db.collection("services").updateOne({ _id: srv._id }, { $set: srv }, { upsert: true });
    }
    console.log(`[Local MongoDB Seeder] Seeded ${services.length} Services.`);

    // 3. Industries
    const industries = [
      { _id: "ind_001", name: "Construction", iconClass: "bi-building-fill", icon: "Building", imageUrl: "/images/industry/construction.jpg", description: "Commercial building, civil infrastructure, residential towers, roads, and high-rise construction projects.", displayOrder: 1, isActive: "Y" },
      { _id: "ind_002", name: "Oil & Gas", iconClass: "bi-fuel-pump-fill", icon: "Flame", imageUrl: "/images/industry/oil-gas.jpg", description: "Upstream, midstream, and downstream operations, refineries, pipelines, and offshore platforms.", displayOrder: 2, isActive: "Y" },
      { _id: "ind_003", name: "Manufacturing", iconClass: "bi-gear-wide-connected", icon: "Factory", imageUrl: "/images/industry/manufacturing.jpg", description: "Heavy manufacturing, assembly plants, steel fabrication, food processing, and industrial production lines.", displayOrder: 3, isActive: "Y" },
      { _id: "ind_004", name: "Hospitality", iconClass: "bi-cup-hot-fill", icon: "Hotel", imageUrl: "/images/industry/hospitality.jpg", description: "Luxury hotels, resorts, commercial catering, event management, and food service staffing.", displayOrder: 4, isActive: "Y" },
      { _id: "ind_005", name: "Facility Management", iconClass: "bi-buildings", icon: "Building2", imageUrl: "/images/industry/facility-management.jpg", description: "Integrated facility upkeep, MEP maintenance, janitorial services, and building operations.", displayOrder: 5, isActive: "Y" },
      { _id: "ind_006", name: "Other Industries", iconClass: "bi-grid-fill", icon: "Globe", imageUrl: "/images/industry/other-industries.jpg", description: "Logistics, warehousing, retail, security services, and specialized commercial operations across the Gulf.", displayOrder: 6, isActive: "Y" }
    ];
    for (const ind of industries) {
      await db.collection("industries").updateOne({ _id: ind._id }, { $set: ind }, { upsert: true });
    }
    console.log(`[Local MongoDB Seeder] Seeded ${industries.length} Industries.`);

    // 4. Contact Info
    const contactInfo = {
      _id: "1",
      phonePrimary: "+971 4 123 4567",
      phoneSecondary: "+971 50 987 6543",
      emailPrimary: "info@alaqshamanpower.com",
      emailSecondary: "support@alaqshamanpower.com",
      address: "Office 402, Al Nahda Tower, Business District, Dubai, UAE",
      workingHoursWeekdays: "Monday - Saturday: 8:00 AM - 6:00 PM",
      workingHoursWeekend: "Sunday: Closed"
    };
    await db.collection("contact_info").updateOne({ _id: contactInfo._id }, { $set: contactInfo }, { upsert: true });
    console.log("[Local MongoDB Seeder] Seeded Contact Info document.");

    // 5. Job Openings
    const jobOpenings = [
      { _id: "job_001", title: "Senior MEP Engineer", location: "Dubai, UAE", type: "Full-time", salary: "AED 12,000 - 15,000 / month", requirements: "Degree in Electrical/Mechanical Engineering with minimum 5 years Gulf experience in MEP installation.", deadline: new Date("2026-10-31") },
      { _id: "job_002", title: "6G Certified Pipe Welder", location: "Abu Dhabi, UAE", type: "Contract", salary: "AED 4,500 - 6,000 / month", requirements: "Valid 6G welding certification (TIG/ARC). Minimum 3 years experience in Oil & Gas pipeline fabrication.", deadline: new Date("2026-09-30") },
      { _id: "job_003", title: "Civil Construction Foreman", location: "Sharjah, UAE", type: "Full-time", salary: "AED 6,000 - 8,000 / month", requirements: "Diploma in Civil Engineering with proven track record leading site labor crews of 50+ workers.", deadline: new Date("2026-11-15") },
      { _id: "job_004", title: "Heavy Equipment Operator (Crane)", location: "Ras Al Khaimah, UAE", type: "Full-time", salary: "AED 4,000 - 5,500 / month", requirements: "Valid UAE Heavy Equipment License. Minimum 4 years operating mobile/tower cranes safely.", deadline: new Date("2026-10-15") }
    ];
    for (const job of jobOpenings) {
      await db.collection("job_openings").updateOne({ _id: job._id }, { $set: job }, { upsert: true });
    }
    console.log(`[Local MongoDB Seeder] Seeded ${jobOpenings.length} Job Openings.`);

    console.log("\n>>> SUCCESS: Local MongoDB Database Seeded Successfully! <<<");
  } catch (err) {
    console.error("Local MongoDB seeding error:", err.message);
  } finally {
    await client.close();
  }
}

runLocalSeed();
