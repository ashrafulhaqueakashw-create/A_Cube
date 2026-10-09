import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Subject from '../models/Subject.js';
import Teacher from '../models/Teacher.js';
import Batch from '../models/Batch.js';
import Settings from '../models/Settings.js';
import Material from '../models/Material.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB Connected for Seeding');

    await User.deleteMany();
    await Subject.deleteMany();
    await Teacher.deleteMany();
    await Batch.deleteMany();
    await Settings.deleteMany();
    await Material.deleteMany();

    const admin = await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@acube.academy',
      phone: '01700000000',
      password: process.env.ADMIN_PASSWORD || 'AdminPass123!',
      role: 'admin',
      status: 'active'
    });

    const demoStudent = await User.create({
      name: 'Demo Student',
      email: process.env.STUDENT_EMAIL || 'student@acube.academy',
      phone: '01711223344',
      password: process.env.STUDENT_PASSWORD || 'StudentPass123!',
      role: 'student',
      status: 'active',
      hscBatch: 'HSC 2026',
      group: 'Science'
    });

    const subjects = await Subject.insertMany([
      { name: 'Physics', namebn: 'পদার্থবিজ্ঞান', slug: 'physics', order: 1 },
      { name: 'Math', namebn: 'গণিত', slug: 'math', order: 2 },
      { name: 'ICT', namebn: 'তথ্য ও যোগাযোগ প্রযুক্তি', slug: 'ict', order: 3 }
    ]);

    const teachers = await Teacher.insertMany([
      {
        name: 'Ashraful Haque Akash',
        subject: 'Physics',
        designation: 'Physics Instructor',
        university: 'BRAC University (CSE)',
        bio: 'BRAC University (CSE) থেকে অধ্যয়নরত। পদার্থবিজ্ঞানের প্রতিটি জটিল কনসেপ্ট সহজ ও বাস্তব উদাহরণের মাধ্যমে হৃদয়ঙ্গম করাতে প্রতিশ্রুতিবদ্ধ।',
        photo: '/images/teachers/akash-physics.jpg',
        cardImage: '/images/teachers/akash-physics.jpg',
        experience: '4+ years of experience as a Physics teacher',
        punchline: 'Physics নিয়ে no চিন্তা',
        displayOrder: 1,
        isActive: true
      },
      {
        name: 'Mosfer Hosen Sabbir',
        subject: 'Math',
        designation: 'Math Instructor',
        university: 'BUTEX (TMDM)',
        bio: 'BUTEX (TMDM) থেকে অধ্যয়নরত। গণিতের মূল ভিত্তি ও শর্টকাট টেকনিক সমৃদ্ধ সমস্যা সমাধানের দক্ষ নির্দেশক।',
        photo: '/images/teachers/sabbir-math.jpg',
        cardImage: '/images/teachers/sabbir-math.jpg',
        experience: '3.5+ Years of Experience as a Math Teacher',
        punchline: 'এখন Mathematics হবে আরও Easy',
        displayOrder: 2,
        isActive: true
      },
      {
        name: 'Azmain Hasan Ahsun',
        subject: 'ICT',
        designation: 'ICT Instructor',
        university: 'IUB (CSE)',
        bio: 'IUB (CSE) থেকে অধ্যয়নরত। আধুনিক তথ্যপ্রযুক্তি ও প্রোগ্রামিংয়ের বাস্তবমুখী শিক্ষাদানে নিবেদিতপ্রাণ।',
        photo: '/images/teachers/ahsun-ict.jpg',
        cardImage: '/images/teachers/ahsun-ict.jpg',
        experience: '3+ years of experience as an ICT teacher',
        punchline: 'HTML থেকে Programming, ICT এখন একদম সহজ',
        displayOrder: 3,
        isActive: true
      }
    ]);

    const batches = await Batch.insertMany([
      { name: 'HSC 2026', year: 2026 },
      { name: 'HSC 2027', year: 2027 }
    ]);

    await Settings.insertMany([
      { key: 'academyName', value: 'A-Cube Academy' },
      { key: 'tagline', value: 'HSC + Admission পূর্ণাঙ্গ প্রস্তুতি' },
      { key: 'phone1', value: '01781-760998' },
      { key: 'phone2', value: '01995-516182' },
      { key: 'address', value: 'ধুমনী পশ্চিম পাড়া (মসজিদ সংলগ্ন), খিলক্ষেত, ঢাকা-১২২৯' },
      { key: 'email', value: 'contact@acube.academy' }
    ]);

    const sampleCategories = ['lecture-notes', 'pdf', 'class-slides', 'problem-sheets', 'question-banks'];
    const materials = [];

    // Physics sample materials
    materials.push(
      {
        title: 'ভেক্টর (Vectors) - পূর্ণাঙ্গ লেকচার নোট ও কনসেপ্ট শীট',
        description: 'HSC ও এডমিশন প্রস্তুতির জন্য ভেক্টরের বেসিক থেকে এডভান্সড গাণিতিক সমস্যাবলি।',
        subjectId: subjects[0]._id,
        category: 'lecture-notes',
        fileKey: 'materials/sample-physics-vectors.pdf',
        fileName: 'Physics_Vectors_Lecture_01.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 1024 * 3,
        uploadedBy: admin._id,
        isSample: true,
        visibility: 'students'
      },
      {
        title: 'নিউটনিয়ান বলবিদ্যা - প্রবলেম সলভিং শীট',
        description: 'গতি ও বলের প্রয়োগ সংক্রান্ত বিগত বছরের বোর্ড ও বিশ্ববিদ্যালয় ভর্তি পরীক্ষার সমাধান।',
        subjectId: subjects[0]._id,
        category: 'problem-sheets',
        fileKey: 'materials/sample-physics-mechanics.pdf',
        fileName: 'Physics_Newtonian_Mechanics_Problems.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 1024 * 2,
        uploadedBy: admin._id,
        isSample: true,
        visibility: 'students'
      }
    );

    // Math sample materials
    materials.push(
      {
        title: 'ক্যালকুলাস (অন্তরীকরণ) - স্মার্ট টেকনিক ও ফর্মুলা ব্যাংক',
        description: 'ডিফারেন্সিয়েশনের সকল গুরুত্বপূর্ণ সূত্র ও শর্টকাট টেকনিক।',
        subjectId: subjects[1]._id,
        category: 'class-slides',
        fileKey: 'materials/sample-math-calculus.pdf',
        fileName: 'Math_Calculus_Formula_Bank.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 1024 * 4,
        uploadedBy: admin._id,
        isSample: true,
        visibility: 'students'
      },
      {
        title: 'সরলরেখা ও বৃত্ত - এডমিশন স্পেশাল প্রশ্ন ব্যাংক',
        description: 'জ্যামিতির গুরুত্বপূর্ণ প্রশ্নের ব্যাখ্যাসহ সমাধান।',
        subjectId: subjects[1]._id,
        category: 'question-banks',
        fileKey: 'materials/sample-math-geometry.pdf',
        fileName: 'Math_Straight_Lines_Question_Bank.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 1024 * 3,
        uploadedBy: admin._id,
        isSample: true,
        visibility: 'students'
      }
    );

    // ICT sample materials
    materials.push(
      {
        title: 'সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস - হ্যান্ডনোট',
        description: 'বাইনারি, অকটাল, হেক্সাডেসিমেল রূপান্তর এবং লজিক গেটের বিস্তারিত আলোচনা।',
        subjectId: subjects[2]._id,
        category: 'lecture-notes',
        fileKey: 'materials/sample-ict-number-systems.pdf',
        fileName: 'ICT_Number_Systems_Lecture.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 1024 * 2,
        uploadedBy: admin._id,
        isSample: true,
        visibility: 'students'
      },
      {
        title: 'সি প্রোগ্রামিং (C Programming) - বেসিক টু এডভান্সড',
        description: 'লুপ, কন্ডিশন ও ফাংশন সংক্রান্ত হ্যান্ডস-অন প্রোগ্রামিং গাইড।',
        subjectId: subjects[2]._id,
        category: 'pdf',
        fileKey: 'materials/sample-ict-c-programming.pdf',
        fileName: 'ICT_C_Programming_Guide.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 1024 * 3,
        uploadedBy: admin._id,
        isSample: true,
        visibility: 'students'
      }
    );

    await Material.insertMany(materials);

    console.log('Database Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seed();
