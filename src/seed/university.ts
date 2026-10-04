/* University programmes (from "UNIVERSITY COURSE DIPLOMA.xlsx"). Used by the seed script to fill
   the "University programmes" list behind the "View full list" button on the Courses page.
   existingSlug = this programme type already has its own page on the site (linked, not duplicated).
   Fees are not kept in code (the repository is public): enter them in the admin panel, where only staff can see them. */

export type UniversityProgramSeed = {
  faculty: string
  code: string
  name: string
  specialization: string | null
  duration: string
  eligibility: string
  existingSlug: string | null
  order: number
}

export const universityPrograms: UniversityProgramSeed[] = [
  {
    "faculty": "Arts & Humanities",
    "code": "BA",
    "name": "Bachelor of Arts",
    "specialization": null,
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 0
  },
  {
    "faculty": "Arts & Humanities",
    "code": "BA",
    "name": "Bachelor of Arts",
    "specialization": "Mathematics",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 1
  },
  {
    "faculty": "Arts & Humanities",
    "code": "BA",
    "name": "Bachelor of Arts (Honours)",
    "specialization": "Drawing & Painting / Economics / English / Geography / Hindi / History / Home Science / Philosophy / Psychology / Public Administration / Sanskrit / Sociology, etc.",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 2
  },
  {
    "faculty": "Arts & Humanities",
    "code": "B.LIT.",
    "name": "Bachelor of Literature",
    "specialization": null,
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 3
  },
  {
    "faculty": "Arts & Humanities",
    "code": "BAP",
    "name": "Bachelor of Applied Psychology",
    "specialization": null,
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 4
  },
  {
    "faculty": "Arts & Humanities",
    "code": "BA",
    "name": "Bachelor of Arts (Additional)",
    "specialization": null,
    "duration": "2 semesters",
    "eligibility": "Graduation in relevant discipline with 45% marks",
    "existingSlug": "graduation",
    "order": 5
  },
  {
    "faculty": "Arts & Humanities",
    "code": "MA",
    "name": "Master of Arts",
    "specialization": "Astrology / Drawing & Painting / Economics / English / Geography / Hindi / History / Home Science / Philosophy / Psychology / Rural Development / Sanskrit / Sociology / Yoga / Public Administration",
    "duration": "4 semesters",
    "eligibility": "Graduation in relevant discipline with 45% marks",
    "existingSlug": "post-graduation",
    "order": 6
  },
  {
    "faculty": "Arts & Humanities",
    "code": "MA",
    "name": "Master of Arts",
    "specialization": "Mathematics",
    "duration": "4 semesters",
    "eligibility": "Graduation in relevant discipline with 45% marks",
    "existingSlug": "post-graduation",
    "order": 7
  },
  {
    "faculty": "Arts & Humanities",
    "code": "MAP",
    "name": "Master of Applied Psychology",
    "specialization": null,
    "duration": "4 semesters",
    "eligibility": "Graduation in relevant discipline with 45% marks",
    "existingSlug": null,
    "order": 8
  },
  {
    "faculty": "Arts & Humanities",
    "code": "PG Diploma",
    "name": "PG Diploma in Guidance and Counselling",
    "specialization": null,
    "duration": "2 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 9
  },
  {
    "faculty": "Arts & Humanities",
    "code": "PG Diploma",
    "name": "Post Graduate Diploma",
    "specialization": "Copywriting, Publishing, Industrial Psychology, Regional Languages, English, Population Studies",
    "duration": "2 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 10
  },
  {
    "faculty": "Science",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Animation & Multimedia / Jewellery Designing / Textile Designing / Interior Designing / Fashion Technology / Hotel Management",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 11
  },
  {
    "faculty": "Science",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Physics, Chemistry & Biology (PCB) / Physics, Chemistry & Math's (PCM) / Statistics / Electronics / Fire Safety & Hazard Management (FSHM) / Automobile / Tele Communication / Physics / Mathematics / Zoology, Biology & Chemistry (ZBC) / Environmental Science / Food & Nutrition / Chemistry",
    "duration": "6 semesters",
    "eligibility": "12th with Science",
    "existingSlug": "graduation",
    "order": 12
  },
  {
    "faculty": "Science",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Biotechnology / Microbiology / Bio Science / Biochemistry / Geology / Botany / Zoology / Bio-Informatics",
    "duration": "6 semesters",
    "eligibility": "12th with Science",
    "existingSlug": "graduation",
    "order": 13
  },
  {
    "faculty": "Science",
    "code": "M.Sc.",
    "name": "Master of Science",
    "specialization": "Chemistry / Physics / Mathematics / Environmental Science / Biology / Botany / Zoology / Geology",
    "duration": "4 semesters",
    "eligibility": "Graduation in relevant field",
    "existingSlug": "post-graduation",
    "order": 14
  },
  {
    "faculty": "Science",
    "code": "M.Sc.",
    "name": "Master of Science",
    "specialization": "Biotechnology / Microbiology / Bio Science / Biochemistry / Tele Communication / Bio-Informatics / Psychology / Food & Nutrition / Geo- Informatics / Electronics / Vedic Science / Statistics",
    "duration": "4 semesters",
    "eligibility": "Graduation in relevant field",
    "existingSlug": "post-graduation",
    "order": 15
  },
  {
    "faculty": "Science",
    "code": "M.Sc.",
    "name": "Master of Science",
    "specialization": "Animation and Multimedia / Textile Designing / Interior Designing / Fashion Technology / Hotel Management",
    "duration": "4 semesters",
    "eligibility": "Graduation in relevant field",
    "existingSlug": "post-graduation",
    "order": 16
  },
  {
    "faculty": "Science",
    "code": "Diploma",
    "name": "Diploma Course",
    "specialization": "Dairy Technology / Food Production / Jewellery Designing / Multimedia / Printing Technology / Textile Designing / Food Preservation Technology / Multimedia & Animation / Catering Technology / Digital Animation",
    "duration": "2 semesters",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 17
  },
  {
    "faculty": "Science",
    "code": "PG Diploma",
    "name": "Post Graduate Diploma",
    "specialization": "Dietetics and Applied Nutrition / Food Processing and Preservation / Hotel Management / Perfumery and Cosmetics Management / Remote Sensing Technology",
    "duration": "2 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 18
  },
  {
    "faculty": "Commerce",
    "code": "B.Com.",
    "name": "Bachelor of Commerce",
    "specialization": null,
    "duration": "6 semesters",
    "eligibility": "10+2 with min. 50%",
    "existingSlug": "graduation",
    "order": 19
  },
  {
    "faculty": "Commerce",
    "code": "B.Com.",
    "name": "Bachelor of Commerce (Honours)",
    "specialization": "Accounting, Economics, Finance, Information Science, International Business, Management, Marketing, etc.",
    "duration": "6 semesters",
    "eligibility": "10+2 with min. 50%",
    "existingSlug": "graduation",
    "order": 20
  },
  {
    "faculty": "Commerce",
    "code": "B.E.Com",
    "name": "Bachelor of E Commerce",
    "specialization": null,
    "duration": "6 semesters",
    "eligibility": "10+2 with min. 50%",
    "existingSlug": null,
    "order": 21
  },
  {
    "faculty": "Commerce",
    "code": "M.Com",
    "name": "Master of Commerce",
    "specialization": null,
    "duration": "4 semesters",
    "eligibility": "Graduation with minimum 45% marks",
    "existingSlug": "post-graduation",
    "order": 22
  },
  {
    "faculty": "Commerce",
    "code": "M.E.Com",
    "name": "Master of E Commerce",
    "specialization": null,
    "duration": "4 semesters",
    "eligibility": "Graduation with minimum 45% marks",
    "existingSlug": null,
    "order": 23
  },
  {
    "faculty": "Commerce",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Taxation, Investment, Accounting & Finance, Cost Accounting, Capital Markets of Merchandise Banking, etc.",
    "duration": "2 semesters",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 24
  },
  {
    "faculty": "Commerce",
    "code": "Certificate",
    "name": "Certificate",
    "specialization": "Taxation, Investment, Accounting & Finance",
    "duration": "6 months",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 25
  },
  {
    "faculty": "Management",
    "code": "BBA",
    "name": "Bachelor of Business Administration",
    "specialization": "Marketing / HR / Finance / Supply Chain Mgt / Business Management / Hotel Management, etc.",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 26
  },
  {
    "faculty": "Management",
    "code": "MBA",
    "name": "Master of Business Administration",
    "specialization": "Advertising Management / Agricultural Management / Banking & Finance / E- Commerce / Finance / Human Resource / Information Technology / Insurance & Risk Management / International Business / Marketing Management / Operations Management / Pharmaceutical Management / Production Management / Project Management / Retail Management / Risk Management / Rural Management / Supply Chain Management / Technology Management / Disaster Management / Material Management / Risk Management / Hospital Management / Event Management / Fire And Safety Management / Hospital and Health Care Management / Hotel Management / Agriculture / Aviation, etc.",
    "duration": "4 semesters",
    "eligibility": "Graduation with minimum 45% marks or equivalent grades",
    "existingSlug": "post-graduation",
    "order": 27
  },
  {
    "faculty": "Management",
    "code": "Integrated BBA+MBA",
    "name": "Integrated BBA+MBA",
    "specialization": "Marketing / HR / Finance / Supply Chain Mgt / Business Management / Hotel Management, etc.",
    "duration": "8 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 28
  },
  {
    "faculty": "Management",
    "code": "E-MBA",
    "name": "Executive MBA",
    "specialization": "HR, Finance, Marketing, International Business, Operation Management, etc.",
    "duration": "2 semesters",
    "eligibility": "Graduation with 4 Semester working experience",
    "existingSlug": null,
    "order": 29
  },
  {
    "faculty": "Management",
    "code": "PG Diploma",
    "name": "Post Graduation Diploma",
    "specialization": "Advertising Management / Agricultural Management / Banking & Finance / E- Commerce / Finance / Human Resource / Information Technology / Insurance & Risk Management / International Business / Marketing Management / Operations Management / Pharmaceutical Management / Production Management / Project Management / Retail Management / Risk Management / Rural Management / Supply Chain Management / Technology Management / Disaster Management / Material Management / Risk Management / Hospital Management / Event Management / Fire And Safety Management / Hospital and Health Care Management / Hotel Management / Agriculture / Aviation / Valuation(Real Estate), etc.",
    "duration": "2 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 30
  },
  {
    "faculty": "Management",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Advertising Management / Agricultural Management / Banking & Finance / E- Commerce / Finance / Human Resource / Information Technology / Insurance & Risk Management / International Business / Marketing Management / Operations Management / Pharmaceutical Management / Production Management / Project Management / Retail Management / Risk Management / Rural Management / Supply Chain Management / Technology Management / Disaster Management / Material Management / Risk Management / Hospital Management / Event Management / Fire And Safety Management / Hospital and Health Care Management / Hotel Management / Agriculture / Aviation, etc.",
    "duration": "2 semesters",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 31
  },
  {
    "faculty": "Management",
    "code": "Certificate",
    "name": "Certificate course",
    "specialization": "Accountancy / Disaster Management / Secretarial Practice & Office Management",
    "duration": "6 months",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 32
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "BCA",
    "name": "Bachelor of Computer Application",
    "specialization": null,
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 33
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Computer Application / Networking",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 34
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "Integrated MCA",
    "name": "Integrated Master of Computer Application",
    "specialization": "Computer Application",
    "duration": "10 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 35
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "MCA-LE",
    "name": "Master of Computer Application (Lateral Entry to 3rd semester)",
    "specialization": null,
    "duration": "4 semesters",
    "eligibility": "PGDCA / BCA",
    "existingSlug": "post-graduation",
    "order": 36
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "MCA-LE",
    "name": "Master of Computer Application (Lateral Entry to 5th semester)",
    "specialization": null,
    "duration": "2 semesters",
    "eligibility": "M.Sc. IT or M.Sc. CS",
    "existingSlug": "post-graduation",
    "order": 37
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "M.Sc.",
    "name": "Master of Science",
    "specialization": "Computer Application",
    "duration": "4 semesters",
    "eligibility": "B.tech / B.Sc. / PGDCA",
    "existingSlug": "post-graduation",
    "order": 38
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "M.Sc.- LE",
    "name": "Master of Science (Lateral Entry)",
    "specialization": "Computer Application",
    "duration": "2 semesters",
    "eligibility": "B.tech / B.Sc. / PGDCA",
    "existingSlug": "post-graduation",
    "order": 39
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "B.Tech- CS",
    "name": "Bachelor of Technology",
    "specialization": "Computer Application",
    "duration": "8 semesters",
    "eligibility": "12th",
    "existingSlug": "b-tech",
    "order": 40
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "M.Tech- CS",
    "name": "Master of Technology",
    "specialization": "Computer Application",
    "duration": "4 semesters",
    "eligibility": "B.tech IT / CS",
    "existingSlug": "m-tech",
    "order": 41
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "MCA",
    "name": "Master of Computer Application",
    "specialization": null,
    "duration": "6 semesters",
    "eligibility": "Graduation in any discipline",
    "existingSlug": "post-graduation",
    "order": 42
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "PGDCA",
    "name": "Post Graduate Diploma in Computer Application",
    "specialization": "Computer Application",
    "duration": "2 semesters",
    "eligibility": "Graduation in any discipline",
    "existingSlug": null,
    "order": 43
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "DCA",
    "name": "Diploma in Computer Application",
    "specialization": "Computer Application",
    "duration": "2 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 44
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "ADCA",
    "name": "Advanced Diploma in Computer Application",
    "specialization": "Computer Application",
    "duration": "2 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 45
  },
  {
    "faculty": "Computer Science & Applications",
    "code": "Certificate",
    "name": "Certificate",
    "specialization": "Computer Application",
    "duration": "6 months",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 46
  },
  {
    "faculty": "Library Science",
    "code": "B.Lib",
    "name": "Bachelor of Library and Information Sciences",
    "specialization": null,
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "b-lib",
    "order": 47
  },
  {
    "faculty": "Library Science",
    "code": "B.Lib",
    "name": "Bachelor of Library and Information Sciences",
    "specialization": null,
    "duration": "2 semesters",
    "eligibility": "Graduation",
    "existingSlug": "b-lib",
    "order": 48
  },
  {
    "faculty": "Library Science",
    "code": "M.Lib",
    "name": "Master of Library and Information Sciences",
    "specialization": null,
    "duration": "2 semesters",
    "eligibility": "B.Lib",
    "existingSlug": "m-lib",
    "order": 49
  },
  {
    "faculty": "Library Science",
    "code": "D.Lib",
    "name": "Diploma in Library Sciences",
    "specialization": null,
    "duration": "2 semesters",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 50
  },
  {
    "faculty": "Education",
    "code": "BA",
    "name": "Bachelor of Arts",
    "specialization": "Education / Physical Education / Yoga",
    "duration": "6 semesters",
    "eligibility": "12th in any discipline with 45%",
    "existingSlug": "graduation",
    "order": 51
  },
  {
    "faculty": "Education",
    "code": "B.P.E.S",
    "name": "Bachelor of Physical Education",
    "specialization": null,
    "duration": "6 semesters",
    "eligibility": "12th from recognized board",
    "existingSlug": null,
    "order": 52
  },
  {
    "faculty": "Education",
    "code": "M.P.E.S",
    "name": "Master of Physical Education",
    "specialization": "Physical Education",
    "duration": "4 semesters",
    "eligibility": "Bachelor Degree in any discipline with minimum 45% or equivalent",
    "existingSlug": null,
    "order": 53
  },
  {
    "faculty": "Education",
    "code": "MA",
    "name": "Master of Arts",
    "specialization": "Education / Physical Education / Yoga",
    "duration": "4 semesters",
    "eligibility": "Bachelor Degree in any discipline with minimum 45% or equivalent",
    "existingSlug": "post-graduation",
    "order": 54
  },
  {
    "faculty": "Education",
    "code": "MA-LE",
    "name": "Master of Arts (Lateral Entry)",
    "specialization": "Education / Physical Education",
    "duration": "2 semesters",
    "eligibility": "B.Ed.",
    "existingSlug": "post-graduation",
    "order": 55
  },
  {
    "faculty": "Education",
    "code": "NTT",
    "name": "Diploma in Nursery Teacher Training",
    "specialization": null,
    "duration": "2 semesters",
    "eligibility": "12th from recognized board",
    "existingSlug": "ntt-nptt",
    "order": 56
  },
  {
    "faculty": "Education",
    "code": "PG Diploma",
    "name": "Post Graduate Diploma",
    "specialization": "Guidance & Counseling / Early Childhood care & Education / Management of Education / Translation Studies / Yoga Science",
    "duration": "2 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 57
  },
  {
    "faculty": "Education",
    "code": "Diploma",
    "name": "Diploma in Early Childhood Care & Education / Yoga Education / NPTT",
    "specialization": null,
    "duration": "2 semesters",
    "eligibility": "12th from recognized board",
    "existingSlug": "ntt-nptt",
    "order": 58
  },
  {
    "faculty": "Education",
    "code": "Diploma",
    "name": "Diploma in Early Childhood Care & Education / Yoga Education / NPTT",
    "specialization": "All Subjects",
    "duration": "2 semesters",
    "eligibility": "10th from recognized board",
    "existingSlug": "ntt-nptt",
    "order": 59
  },
  {
    "faculty": "Journalism & Mass Communication",
    "code": "BA",
    "name": "Bachelor of Arts",
    "specialization": "Journalism & Mass Communication / Mass Communication",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 60
  },
  {
    "faculty": "Journalism & Mass Communication",
    "code": "BJMC",
    "name": "Bachelor of Journalism and Mass Communication",
    "specialization": null,
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 61
  },
  {
    "faculty": "Journalism & Mass Communication",
    "code": "MA",
    "name": "Master of Arts",
    "specialization": "Journalism & Mass Communication / Mass Communication",
    "duration": "4 semesters",
    "eligibility": "Graduation",
    "existingSlug": "post-graduation",
    "order": 62
  },
  {
    "faculty": "Journalism & Mass Communication",
    "code": "MJMC",
    "name": "Master of Journalism and Mass Communication",
    "specialization": null,
    "duration": "4 semesters",
    "eligibility": "BJMC",
    "existingSlug": null,
    "order": 63
  },
  {
    "faculty": "Journalism & Mass Communication",
    "code": "PG Diploma",
    "name": "Post Graduate Diploma",
    "specialization": "Journalism and Mass Communication",
    "duration": "2 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 64
  },
  {
    "faculty": "Journalism & Mass Communication",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Journalism & Mass Communication / Mass Communication / Mass Media",
    "duration": "2 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 65
  },
  {
    "faculty": "Journalism & Mass Communication",
    "code": "DJMC",
    "name": "Diploma in Journalism and Mass Communication",
    "specialization": null,
    "duration": "4 semesters",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 66
  },
  {
    "faculty": "Engineering",
    "code": "B.Tech",
    "name": "Bachelor of Technology",
    "specialization": "Automobile / Bio-Technology / Civil / Electricals / Electricals & Electronics / Electronics & Communication / Instrumentation / Mechanical / Metallurgical / Mining / Renewable / Textile Engineering / VLSI / Fire & Industrial / Aeronautics / Biotechnology / Textiles / Manufacturing Technology / Mechanical Design Engineering / Production Engineering / Chemical / Marine / Mobile Telecommunication / Photonics / Dairy",
    "duration": "8 semesters",
    "eligibility": "12th (Science)",
    "existingSlug": "b-tech",
    "order": 67
  },
  {
    "faculty": "Engineering",
    "code": "B.Tech- LE",
    "name": "Bachelor of Technology (Lateral Entry)",
    "specialization": "Automobile / Bio-Technology / Civil / Electricals / Electricals & Electronics / Electronics & Communication / Instrumentation / Mechanical / Metallurgical / Mining / Renewable / Textile Engineering / VLSI / Fire & Industrial / Aeronautics / Biotechnology / Textiles / Manufacturing Technology / Mechanical Design Engineering / Production Engineering / Chemical / Marine / Mobile Telecommunication / Photonics / Dairy",
    "duration": "6 semesters",
    "eligibility": "Polytechnic diploma",
    "existingSlug": "b-tech",
    "order": 68
  },
  {
    "faculty": "Engineering",
    "code": "B.Tech+M.tech",
    "name": "Integrated B.Tech + M.Tech",
    "specialization": "Automobile / Bio-Technology / Civil / Electricals / Electricals & Electronics / Electronics & Communication / Instrumentation / Mechanical / Metallurgical / Mining / Renewable / Textile Engineering / VLSI / Fire & Industrial / Aeronautics / Biotechnology / Textiles / Manufacturing Technology / Mechanical Design Engineering / Production Engineering / Chemical / Marine / Mobile Telecommunication / Photonics / Dairy",
    "duration": "10 semesters",
    "eligibility": "12th (Science)",
    "existingSlug": null,
    "order": 69
  },
  {
    "faculty": "Engineering",
    "code": "B.Tech+MBA",
    "name": "Integrated B.Tech + MBA",
    "specialization": "All Specialization",
    "duration": "10 semesters",
    "eligibility": "12th (Science)",
    "existingSlug": null,
    "order": 70
  },
  {
    "faculty": "Engineering",
    "code": "M.Tech",
    "name": "Master of Technology",
    "specialization": "Civil / Civil — Construction / Civil — Structural / Civil - Highway / Electrical / Electrical & Electronics / Electronics & Communication / Mechanical / Power Electronics / Embedded systems & VLSI / Power System",
    "duration": "4 semesters",
    "eligibility": "Bachelor Degree in Relevant Stream",
    "existingSlug": "m-tech",
    "order": 71
  },
  {
    "faculty": "Engineering",
    "code": "Diploma- LE",
    "name": "Diploma (Lateral Entry)",
    "specialization": "Architectural Assistantship Engineering / Automobile Engineering / Chemical Engineering / Civil Engineering / Computer Science & Engineering / Electrical Engineering / Electricals & Electronics Engineering / Electronics & Communication Engineering / Information Technology Engineering / Instrumental Technology Engineering / Mechanical Engineering / Metallurgical Engineering / Mining Engineering",
    "duration": "4 semesters",
    "eligibility": "12th or Diploma",
    "existingSlug": null,
    "order": 72
  },
  {
    "faculty": "Engineering",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Architectural Assistantship Engineering / Automobile Engineering / Chemical Engineering / Civil Engineering / Computer Science & Engineering / Electrical Engineering / Electricals & Electronics Engineering / Electronics & Communication Engineering / Information Technology Engineering / Instrumental Technology Engineering / Mechanical Engineering / Metallurgical Engineering / Mining Engineering",
    "duration": "6 semesters",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 73
  },
  {
    "faculty": "Engineering",
    "code": "Certificate",
    "name": "Certificate course",
    "specialization": "Carpenter / Draughtsman - Civil / Draughtsman - Mechanical / Electrician / Filter / Mechanic - Diesel / Mechanic - Refrigeration & Air Conditioner / Mechanic - Tractor / Mechanist / Painter / Plumber / Turner / Welder - Gas & Electric",
    "duration": "6 months",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 74
  },
  {
    "faculty": "Agriculture",
    "code": "B.Sc.- Agri",
    "name": "Bachelor of Science",
    "specialization": "Agriculture",
    "duration": "8 semesters",
    "eligibility": "10+2 (PCM / PCB / Agri)",
    "existingSlug": "graduation",
    "order": 75
  },
  {
    "faculty": "Agriculture",
    "code": "B.Sc.-Horti",
    "name": "Bachelor of Science",
    "specialization": "Horticulture",
    "duration": "8 semesters",
    "eligibility": "10+2 (PCM / PCB / Agri)",
    "existingSlug": "graduation",
    "order": 76
  },
  {
    "faculty": "Agriculture",
    "code": "B.Tech",
    "name": "Bachelor of Technology",
    "specialization": "Agriculture Engineering",
    "duration": "8 semesters",
    "eligibility": "10+2 (PCM / PCB / Agri)",
    "existingSlug": "b-tech",
    "order": 77
  },
  {
    "faculty": "Agriculture",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Forestry",
    "duration": "8 semesters",
    "eligibility": "10+2 (PCM / PCB / Agri)",
    "existingSlug": "graduation",
    "order": 78
  },
  {
    "faculty": "Agriculture",
    "code": "M.Sc.(Agri)",
    "name": "Master of Science",
    "specialization": "Agronomy",
    "duration": "4 semesters",
    "eligibility": "B.Sc. Agriculture",
    "existingSlug": "post-graduation",
    "order": 79
  },
  {
    "faculty": "Agriculture",
    "code": "M.Sc.(Agri)",
    "name": "Master of Science",
    "specialization": "Agri. Chemistry & Soil Science",
    "duration": "4 semesters",
    "eligibility": "B.Sc. Agriculture",
    "existingSlug": "post-graduation",
    "order": 80
  },
  {
    "faculty": "Agriculture",
    "code": "M.Sc.(Agri)",
    "name": "Master of Science",
    "specialization": "Agriculture",
    "duration": "4 semesters",
    "eligibility": "B.Sc. Agriculture / Horticulture",
    "existingSlug": "post-graduation",
    "order": 81
  },
  {
    "faculty": "Agriculture",
    "code": "M.Sc.(Agri)",
    "name": "Master of Science",
    "specialization": "Plant Breeding & Genetics",
    "duration": "4 semesters",
    "eligibility": "B.Sc. Agriculture",
    "existingSlug": "post-graduation",
    "order": 82
  },
  {
    "faculty": "Agriculture",
    "code": "M.tech (Agri)",
    "name": "Master of Technology",
    "specialization": "Agriculture Engineering",
    "duration": "4 semesters",
    "eligibility": "B.tech Agriculture",
    "existingSlug": "m-tech",
    "order": 83
  },
  {
    "faculty": "Agriculture",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Agriculture",
    "duration": "6 semesters",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 84
  },
  {
    "faculty": "Naturopathy & Yoga",
    "code": "BA",
    "name": "Bachelor of Arts",
    "specialization": "Yoga",
    "duration": "6 semesters",
    "eligibility": "12th in any discipline with 45%",
    "existingSlug": "graduation",
    "order": 85
  },
  {
    "faculty": "Naturopathy & Yoga",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Yoga",
    "duration": "6 semesters",
    "eligibility": "12th in any discipline with 45%",
    "existingSlug": "graduation",
    "order": 86
  },
  {
    "faculty": "Naturopathy & Yoga",
    "code": "BNYS",
    "name": "Bachelor of Naturopathy and Yogic Sciences",
    "specialization": null,
    "duration": "8 semesters",
    "eligibility": "10+2 (PCM / PCB)",
    "existingSlug": null,
    "order": 87
  },
  {
    "faculty": "Naturopathy & Yoga",
    "code": "BNYS-LE",
    "name": "Bachelor of Naturopathy and Yogic Sciences",
    "specialization": null,
    "duration": "6 semesters",
    "eligibility": "DNYS 4 semester after 10+2",
    "existingSlug": null,
    "order": 88
  },
  {
    "faculty": "Naturopathy & Yoga",
    "code": "MA",
    "name": "Master of Arts",
    "specialization": "Yoga",
    "duration": "4 semesters",
    "eligibility": "Bachelor Degree in any discipline with minimum 45% or equivalent",
    "existingSlug": "post-graduation",
    "order": 89
  },
  {
    "faculty": "Naturopathy & Yoga",
    "code": "M.Sc.",
    "name": "Master of Science",
    "specialization": "Yoga",
    "duration": "4 semesters",
    "eligibility": "Bachelor Degree in any discipline with minimum 45% or equivalent",
    "existingSlug": "post-graduation",
    "order": 90
  },
  {
    "faculty": "Naturopathy & Yoga",
    "code": "PG Diploma",
    "name": "Post Graduate Diploma",
    "specialization": "Yoga",
    "duration": "2 semesters",
    "eligibility": "Bachelor Degree in any discipline with minimum 45% or equivalent",
    "existingSlug": null,
    "order": 91
  },
  {
    "faculty": "Naturopathy & Yoga",
    "code": "PG Diploma",
    "name": "Post Graduate Diploma",
    "specialization": "Yoga and Naturopathy",
    "duration": "2 semesters",
    "eligibility": "BNYS / BAMS / BHMS / MBBS / BUMS",
    "existingSlug": null,
    "order": 92
  },
  {
    "faculty": "Naturopathy & Yoga",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Yoga",
    "duration": "2 semesters",
    "eligibility": "12th in any discipline with 45%",
    "existingSlug": null,
    "order": 93
  },
  {
    "faculty": "Naturopathy & Yoga",
    "code": "DNYS",
    "name": "Diploma in Naturopathy & Yogic Sciences",
    "specialization": null,
    "duration": "4 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 94
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "BA",
    "name": "Bachelor of Arts",
    "specialization": "Beauty Care and Health, Fashion Design & Retail Management, Fashion Management, Fashion Marketing and Promotion, Textile Design, Fashion& Apparel Design, Fashion Design for Industry",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 95
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "BA",
    "name": "BA in Digital Filmmaking and Animation",
    "specialization": "Digital Filmmaking and Animation",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 96
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "BA",
    "name": "Bachelor of Arts",
    "specialization": "Animation and Graphic Design",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 97
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "BA",
    "name": "Bachelor of Arts",
    "specialization": "Animation & Multimedia",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 98
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "BA",
    "name": "Bachelor of Arts",
    "specialization": "Animation and CG Arts",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 99
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Fashion Design & Garment Making",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 100
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Fashion Technology & Costume Design",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 101
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Animation",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 102
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Animation and Gaming",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 103
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Animation and VFX",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 104
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Digital Art and Technology, Multimedia Production and Technology, 3D Animation and Visual Effects, Digital Filmmaking and Animation",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 105
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "BFA",
    "name": "Bachelor of Fine Arts in Animation, Graphics, and Web Design",
    "specialization": "Animation, Graphics, and Web Design",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 106
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "BDA",
    "name": "B.Des in Animation",
    "specialization": "Animation",
    "duration": "8 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 107
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "BVA",
    "name": "Bachelor of Visual Arts",
    "specialization": "Animation",
    "duration": "8 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 108
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "MA",
    "name": "Master of Arts",
    "specialization": "Apparel Production, Quality Control, Costume Control, Fashion Accessory Design & Technology, Fashion Industry, Fashion Styling & Photography, Product Design & Dev. For Fashion Industry, Textile Design, Fashion Portfolio Development, Fashion Development",
    "duration": "4 semesters",
    "eligibility": "Graduation",
    "existingSlug": "post-graduation",
    "order": 109
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "PG Diploma",
    "name": "Post Graduate Diploma",
    "specialization": "Apparel Production, Quality Control, Costume Control, Fashion Accessory Design & Technology, Fashion Industry, Fashion Styling & Photography, Product Design & Dev. For Fashion Industry, Textile Design, Fashion Portfolio Development, Fashion Development",
    "duration": "4 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 110
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "Diploma",
    "name": "Diploma in Animation, Video Editing and Post Production work",
    "specialization": "Animation, Video Editing and Post Production work",
    "duration": "4 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 111
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "DIA",
    "name": "Diploma in Animation and Filmmaking",
    "specialization": "Animation and Filmmaking",
    "duration": "4 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 112
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Beauty Care and Health, Fashion Design & Retail Management, Fashion Management, Fashion Marketing and Promotion, Textile Design, Fashion& Apparel Design, Fashion Design for Industry",
    "duration": "2 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 113
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Animation Engineering, Classical Animation, Fusion Animation, Graphic and Web Designing, Video Editing and VFX, 2D Animation VFX and Post Production, 3D Animation and Visual Effects",
    "duration": "2 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 114
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "Diploma",
    "name": "Diploma in CG Animation",
    "specialization": "CG Animation",
    "duration": "2 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 115
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "Diploma",
    "name": "Diploma in Digital Animation",
    "specialization": "Digital Animation",
    "duration": "2 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 116
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "Diploma",
    "name": "Diploma in Animation",
    "specialization": "Animation",
    "duration": "2 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 117
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "Diploma",
    "name": "Diploma in 3D Animation",
    "specialization": "3D Animation",
    "duration": "2 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 118
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "DFD",
    "name": "Diploma in Fashion Design & Garment Making",
    "specialization": "Fashion Design & Garment Making",
    "duration": "2 semesters",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 119
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "DFT",
    "name": "Diploma in Fashion & Textile Design",
    "specialization": "Fashion & Textile Design",
    "duration": "2 semesters",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 120
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "DID",
    "name": "Diploma in Interior Design",
    "specialization": "Interior Design",
    "duration": "2 semesters",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 121
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "Certificate",
    "name": "Certificate course",
    "specialization": "Editing, Mixing and Post Production",
    "duration": "6 months",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 122
  },
  {
    "faculty": "Fashion Design & Animation",
    "code": "Certificate",
    "name": "Certificate course",
    "specialization": "Visual Effects, Motion, Flash",
    "duration": "6 months",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 123
  },
  {
    "faculty": "Environmental Science",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Environmental Science / Water Resource Management / Environmental Resource Management",
    "duration": "6 semesters",
    "eligibility": "12th with Science",
    "existingSlug": "graduation",
    "order": 124
  },
  {
    "faculty": "Environmental Science",
    "code": "M.Sc.",
    "name": "Master of Science",
    "specialization": "Environmental Science / Water Resource Management / Environmental Resource Management",
    "duration": "4 semesters",
    "eligibility": "Graduation with relevant stream",
    "existingSlug": "post-graduation",
    "order": 125
  },
  {
    "faculty": "Environmental Science",
    "code": "PG Diploma",
    "name": "Post Graduate Diploma",
    "specialization": "Environmental Science / Water Resource Management / Environmental Resource Management",
    "duration": "2 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 126
  },
  {
    "faculty": "Environmental Science",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Environmental Science / Water Resource Management / Environmental Resource Management",
    "duration": "2 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 127
  },
  {
    "faculty": "Information & Communication Technology",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Business Information Technology / Information Technology for Design / Communication Arts / Computer Engineering / Information Technology / Computing Science",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 128
  },
  {
    "faculty": "Information & Communication Technology",
    "code": "B.Sc. IT",
    "name": "Bachelor of Science-IT",
    "specialization": "Artificial Intelligence / Software Development / Computing and Business",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 129
  },
  {
    "faculty": "Information & Communication Technology",
    "code": "B.Tech",
    "name": "Bachelor of Technology (Lateral Entry)",
    "specialization": "Information Technology / Software Engineering",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "b-tech",
    "order": 130
  },
  {
    "faculty": "Information & Communication Technology",
    "code": "B.Tech",
    "name": "Bachelor of Technology",
    "specialization": "Information Technology / Software Engineering",
    "duration": "8 semesters",
    "eligibility": "12th",
    "existingSlug": "b-tech",
    "order": 131
  },
  {
    "faculty": "Information & Communication Technology",
    "code": "M.Sc.-LE",
    "name": "Master of Science (Lateral Entry)",
    "specialization": "Information Technology / Visual Communication",
    "duration": "2 semesters",
    "eligibility": "B. Tech / B.Sc. (I.T / CS) / PGDCA",
    "existingSlug": "post-graduation",
    "order": 132
  },
  {
    "faculty": "Information & Communication Technology",
    "code": "M.Sc.",
    "name": "Master of Science",
    "specialization": "Information Technology / Visual Communication",
    "duration": "4 semesters",
    "eligibility": "B. Tech / B.Sc. (I.T / CS) / PGDCA",
    "existingSlug": "post-graduation",
    "order": 133
  },
  {
    "faculty": "Information & Communication Technology",
    "code": "M.Tech",
    "name": "Master of Technology",
    "specialization": "Information Technology / Software Engineering / Computing and Business",
    "duration": "4 semesters",
    "eligibility": "B. Tech / B.Sc. (I.T / CS) / PGDCA",
    "existingSlug": "m-tech",
    "order": 134
  },
  {
    "faculty": "Information & Communication Technology",
    "code": "PG Diploma",
    "name": "Post Graduate Diploma",
    "specialization": "Information Technology / Software Engineering",
    "duration": "2 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 135
  },
  {
    "faculty": "Information & Communication Technology",
    "code": "DIT",
    "name": "Diploma in Information Technology",
    "specialization": "Information Technology",
    "duration": "2 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 136
  },
  {
    "faculty": "Information & Communication Technology",
    "code": "Certificate",
    "name": "Certificate Course",
    "specialization": "Information Technology / Mobile Technology",
    "duration": "6 months",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 137
  },
  {
    "faculty": "Social Science",
    "code": "BA",
    "name": "Bachelor of Arts",
    "specialization": "Social Science / Sociology",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": "graduation",
    "order": 138
  },
  {
    "faculty": "Social Science",
    "code": "BSW",
    "name": "Bachelor of Social Work",
    "specialization": "Social Work",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 139
  },
  {
    "faculty": "Social Science",
    "code": "BPP",
    "name": "Bachelor of Public Policy",
    "specialization": "Public Policy",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 140
  },
  {
    "faculty": "Social Science",
    "code": "BPH",
    "name": "Bachelor in Public Health",
    "specialization": "Public Health",
    "duration": "6 semesters",
    "eligibility": "12th",
    "existingSlug": null,
    "order": 141
  },
  {
    "faculty": "Social Science",
    "code": "PGDSW",
    "name": "Post Graduate Diploma",
    "specialization": "Social Work",
    "duration": "2 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 142
  },
  {
    "faculty": "Social Science",
    "code": "MA",
    "name": "Master of Arts",
    "specialization": "Social Science / Sociology",
    "duration": "4 semesters",
    "eligibility": "Graduation",
    "existingSlug": "post-graduation",
    "order": 143
  },
  {
    "faculty": "Social Science",
    "code": "MSW",
    "name": "Master of Social Work",
    "specialization": "Social Work",
    "duration": "4 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 144
  },
  {
    "faculty": "Social Science",
    "code": "MPP",
    "name": "Master of Public Policy",
    "specialization": "Public Policy",
    "duration": "4 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 145
  },
  {
    "faculty": "Social Science",
    "code": "MPH",
    "name": "Master in Public Health",
    "specialization": "Public Health",
    "duration": "4 semesters",
    "eligibility": "Graduation",
    "existingSlug": null,
    "order": 146
  },
  {
    "faculty": "Social Science",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Social work / Vastu Shastra / Jyothishyam",
    "duration": "2 semesters",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 147
  },
  {
    "faculty": "Social Science",
    "code": "Certificate",
    "name": "Certificate",
    "specialization": "Social work / Human Studies / Woman Studies",
    "duration": "6 months",
    "eligibility": "10th",
    "existingSlug": null,
    "order": 148
  },
  {
    "faculty": "Paramedical Science",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Anesthesia Technology / Biological Science / Dialysis Technician / Dietetics and Applied Nutrition / Hospital Management / Medical Laboratory Technology / Operation Theater Technology / Optometry / Perfusion Technology / Radiology & Imaging Technology / Blood Transfusion Technology / Radiotherapy Technology / Cardiac Care Technology / Medical Sociology / Respiratory Care Technology",
    "duration": "6 semesters",
    "eligibility": "12th (Science)",
    "existingSlug": "medical-courses",
    "order": 149
  },
  {
    "faculty": "Paramedical Science",
    "code": "BAP",
    "name": "Bachelor in Aayurvedic Pharmacy",
    "specialization": "Aayurvedic Pharmacy",
    "duration": "8 semesters",
    "eligibility": "12th (Science)",
    "existingSlug": "medical-courses",
    "order": 150
  },
  {
    "faculty": "Paramedical Science",
    "code": "BPT",
    "name": "Bachelor of Physiotherapy",
    "specialization": "Orthopedics / Neurological Science / Cardiopulmonary Science / Community Based Rehabilitation / Pediatrics / Sport",
    "duration": "8 semesters",
    "eligibility": "12th with (PCB)",
    "existingSlug": "medical-courses",
    "order": 151
  },
  {
    "faculty": "Paramedical Science",
    "code": "M.Sc.",
    "name": "Master of Science",
    "specialization": "Clinical Psychology / Dietetics and Applied Nutrition / Hospital Management / Industrial Biotechnology / Cardiac Care Technology / Medical Laboratory Technology / Medical Microbiology / Medical / Physiology / Medical Biochemistry / Naturopathy & Yoga Sciences / Optometry / Medical Sociology / Radiology & Imaging Technology",
    "duration": "4 semesters",
    "eligibility": "B.Sc. in relevant Subject",
    "existingSlug": "medical-courses",
    "order": 152
  },
  {
    "faculty": "Paramedical Science",
    "code": "MPT",
    "name": "Master in Physiotherapy",
    "specialization": "Orthopedics / Neurological Science / Cardiopulmonary Science / Community Based Rehabilitation / Pediatrics / Sport",
    "duration": "4 semesters",
    "eligibility": "BPT",
    "existingSlug": "medical-courses",
    "order": 153
  },
  {
    "faculty": "Paramedical Science",
    "code": "PG Diploma",
    "name": "Post Graduate Diploma",
    "specialization": "Industrial Safety & Fire / Industrial Safety Management / Clinical Pathology / Health, Safety & Environment / Naturopathy & Yoga Sciences / Fire Safety & Hazard Management / Dermatology",
    "duration": "2 semesters",
    "eligibility": "Graduation(Science)",
    "existingSlug": "medical-courses",
    "order": 154
  },
  {
    "faculty": "Paramedical Science",
    "code": "PG Diploma",
    "name": "Post Graduate Diploma",
    "specialization": "Ultrasonography / Maternal & Child Health / Geriatric Medicine / Diabetology / Forensic Science / Pharma Regulatory Affairs / Acupuncture / Echocardiography / Dermatology / Rheumatology / Laboratory Medicine / Clinical Cardiology / Family Medicine / Cosmetology & Aesthetics Medicine / Ophthalmic Technology / Forensic Science / Dietetics and Nutrition / Emergency Medicine Technology",
    "duration": "2 semesters",
    "eligibility": "Graduation(Science)",
    "existingSlug": "medical-courses",
    "order": 155
  },
  {
    "faculty": "Paramedical Science",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Anesthesia Technology Radiology & Imaginary Technology (FRIT) / Medical Lab Technology (MILT",
    "duration": "6 months",
    "eligibility": "10th",
    "existingSlug": "medical-courses",
    "order": 156
  },
  {
    "faculty": "Paramedical Science",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Ayurvedic Compounder / Ayurvedic Pharmacy / Dental Technician & Hygiene / Dental Technology / Dialysis Technician / ECG Technician / Fire & Safety / Health Care & Services / Homoeopathic Pharmacy / Industrial Safety & Fire / Medical Lab Technology (MIT) / Medical Record Technology / Multipurpose Health Worker / Naturopathy & Yogic Sciences / Nutrition & Dietic / Operation Theater Technology (OTT) / Ophthalmic Technician / Optometry / Radiology and Imaging Technology / Ultra Sound Technology (UST) / Veterinary Pharmacy / X-Ray Technician / Blood Transfusion Technology / Cardiology Technician / CT Scan Technician / Pharma Sales Management / Occupational Therapy / Orthopedics / EEG Technician / Emergency Medical Technician",
    "duration": "4 semesters",
    "eligibility": "10th",
    "existingSlug": "medical-courses",
    "order": 157
  },
  {
    "faculty": "Paramedical Science",
    "code": "DPT",
    "name": "Diploma in Physiotherapy",
    "specialization": "Physiotherapy",
    "duration": "4 semesters",
    "eligibility": "10th",
    "existingSlug": "medical-courses",
    "order": 158
  },
  {
    "faculty": "Paramedical Science",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Beauty & Hair Care / Beauty Cosmetology Health & Wellness / Clinical Research / Fire & Safety / Health Care Assistance / Health Safety & Environment / Hygiene & Sanitation / Medical Transcriptions / Nutrition & Health Education / Optometry / Vision Care Technician / Yoga & Naturopathy / Hospital Management / Medical Dresser / Panchakarma Therapy / Operation Theater Technology (OTT) / Cosmetic Technician / EEG Technology / Nursing Assistant / Nutrition & Health Education / Medical Lab Technology / Cosmetic Trichology Technology / Industrial Safety / Industrial Safety & Fire Management / Multipurpose Health Worker",
    "duration": "2 semesters",
    "eligibility": "10th",
    "existingSlug": "medical-courses",
    "order": 159
  },
  {
    "faculty": "Paramedical Science",
    "code": "Certificate",
    "name": "Certificate Course",
    "specialization": "Caregiver Training / Nursing Assistant / Beauty Cosmetology Health & Wellness / Fire & Safety, Operation Theater Technology (OTT) / Acupuncture Science / Health Care Management / Beauty & Hair Care / Medical Lab Technician",
    "duration": "6 months",
    "eligibility": "10th",
    "existingSlug": "medical-courses",
    "order": 160
  },
  {
    "faculty": "Biotechnology",
    "code": "B.Sc.",
    "name": "Bachelor of Science",
    "specialization": "Biotechnology / Bio Informatics / Bio Chemistry / Plant Tissue Culture / Medical Biotechnology / Industrial Microbiology / Industrial Biotechnology / Applied Biotechnology",
    "duration": "6 semesters",
    "eligibility": "12th with Science",
    "existingSlug": "graduation",
    "order": 161
  },
  {
    "faculty": "Biotechnology",
    "code": "B.Tech",
    "name": "Bachelor of Technology",
    "specialization": "Biotechnology / Bio Informatics / Bio Chemistry / Applied Technology / Advanced Zoology / Zoology and Animal Biotechnology / Medical Biotechnology / Bioprocess Technology / Molecular & Cellular Engineering / Industrial Microbiology / Industrial Microbiology / Nano Biotechnology / Agricultural Biotechnology / Cell Biology / Metabolic Engineering / Principles of Chemical Processes / Microbiology and Immunology / Genetics and Genetic Engineering / Enzyme Engineering and Technology / Process Control",
    "duration": "8 semesters",
    "eligibility": "12th with Science",
    "existingSlug": "b-tech",
    "order": 162
  },
  {
    "faculty": "Biotechnology",
    "code": "B.Tech",
    "name": "Bachelor of Technology",
    "specialization": "Biotechnology / Bio Informatics / Bio Chemistry / Applied Technology / Advanced Zoology / Zoology and Animal Biotechnology / Medical Biotechnology / Bioprocess Technology / Molecular & Cellular Engineering / Industrial Microbiology / Industrial Microbiology / Nano Biotechnology / Agricultural Biotechnology / Cell Biology / Metabolic Engineering / Principles of Chemical Processes / Microbiology and Immunology / Genetics and Genetic Engineering / Enzyme Engineering and Technology / Process Control",
    "duration": "6 semesters",
    "eligibility": "12th with Science",
    "existingSlug": "b-tech",
    "order": 163
  },
  {
    "faculty": "Biotechnology",
    "code": "M.Sc.",
    "name": "Master of Science",
    "specialization": "Biotechnology / Bio Informatics / Bio Chemistry / Plant Tissue Culture / Medical Biotechnology / Industrial Microbiology / Industrial Biotechnology / Applied Biotechnology",
    "duration": "4 semesters",
    "eligibility": "Graduation in relevant Stream",
    "existingSlug": "post-graduation",
    "order": 164
  },
  {
    "faculty": "Biotechnology",
    "code": "M.Tech",
    "name": "Master of Technology",
    "specialization": "Biotechnology / Bio Informatics / Bio Chemistry / Applied Technology / Advanced Zoology / Zoology and Animal Biotechnology / Medical Biotechnology / Bioprocess Technology / Molecular & Cellular Engineering / Industrial Microbiology / Industrial Microbiology / Nano Biotechnology / Agricultural Biotechnology / Cell Biology / Metabolic Engineering / Principles of Chemical Processes / Microbiology and Immunology / Genetics and Genetic Engineering / Enzyme Engineering and Technology / Process Control",
    "duration": "4 semesters",
    "eligibility": "Graduation in relevant Stream",
    "existingSlug": "m-tech",
    "order": 165
  },
  {
    "faculty": "Biotechnology",
    "code": "PG Diploma",
    "name": "Post Graduate Diploma",
    "specialization": "Biotechnology / Bio Informatics / Bio Chemistry / Applied Technology / Advanced Zoology / Zoology and Animal Biotechnology / Medical Biotechnology / Bioprocess Technology / Molecular & Cellular Engineering / Industrial Microbiology / Industrial Microbiology / Nano Biotechnology / Agricultural Biotechnology / Cell Biology / Metabolic Engineering / Principles of Chemical Processes / Microbiology and Immunology / Genetics and Genetic Engineering / Enzyme Engineering and Technology / Process Control",
    "duration": "2 semesters",
    "eligibility": "Graduation in relevant Stream",
    "existingSlug": null,
    "order": 166
  },
  {
    "faculty": "Biotechnology",
    "code": "Diploma",
    "name": "Diploma",
    "specialization": "Biotechnology / Bio Informatics / Bio Chemistry / Plant Tissue Culture",
    "duration": "6 semesters",
    "eligibility": "10th or 12th passed",
    "existingSlug": null,
    "order": 167
  },
  {
    "faculty": "Research (Ph.D. & M.Phil.)",
    "code": "Ph.D.",
    "name": "Doctorate of Philosophy",
    "specialization": "All Specializations",
    "duration": "6 semesters",
    "eligibility": "PG in relevant subject with 50%",
    "existingSlug": "phd",
    "order": 168
  },
  {
    "faculty": "Research (Ph.D. & M.Phil.)",
    "code": "M.Phil.",
    "name": "Master of Philosophy",
    "specialization": "All Specializations",
    "duration": "2 semesters",
    "eligibility": "PG in relevant subject with 50%",
    "existingSlug": null,
    "order": 169
  }
]
