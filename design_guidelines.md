# Mystery-us 3D Animated Website - Design Guidelines

## Theme & Visual Identity

**Brand:** Mystery-us - "Where Curiosity Meets Celebration"  
**Institution:** MCA Department, Bangalore Institute of Technology

**Color Palette:**
- Base: Deep blacks, dark purples, midnight blue
- Accents: Neon cyan, electric purple, gold
- Effects: Soft glows, glassmorphism, subtle grain/noise texture

**Typography:**
- Headings: Bold, futuristic font (e.g., Orbitron, Exo 2, Space Grotesk)
- Body: Clean sans-serif (Inter, Plus Jakarta Sans)

**Visual Style:**
- Mystery elements: floating question marks, glowing orbs, abstract shapes, light trails
- 3D effects throughout using CSS transforms and parallax
- Framer Motion-style spring animations
- Glassmorphism cards with backdrop blur and neon borders

## Layout & Navigation

**Sticky Navbar:**
- Logo: "Mystery-us" text/icon
- Menu: Home, About, Days & Events, Sports & Rules, Schedule, Gallery, Coordinators, Register
- Behavior: Transparent at top → glassmorphism with slight glow on scroll
- Active section: Neon underline animation with scroll spy
- Smooth scroll to sections

**Scroll-to-Top Button:** Floating bottom-right with hover glow

## Hero Section (Critical - Make This Insane)

**3D Centerpiece:**
- Floating 3D cube/sphere with slow rotation
- Mouse-move reactive tilt/parallax
- Multiple faces showing "Mystery-us" logo and "BIT – MCA"

**Background:**
- 3D particles/stars/glow orbs moving slowly
- Parallax layers with mystery symbols (circles, lines, question marks)
- Subtle depth with multiple moving layers

**Content:**
- Main title: "Mystery-us 2025" (staggered fade-up + scale-in animation)
- Subheading: "Ethnic Day, Freshers Party & Sports – MCA, Bangalore Institute of Technology"
- Tagline: "Three days of culture, chaos, and unforgettable memories"

**Event Highlights (Glassmorphism Cards):**
- Ethnic Day: December 11, 2025 | Venue 621 | Dress: Ethnic Wear
- Freshers Party: December 12, 2025 | 10:30 AM | Ramegowda Seminar Hall
- Sports Carnival: Day 3 | 5 Events

**Countdown Timer:**
- Glowing glassmorphism cards for Days/Hours/Minutes/Seconds
- Soft neon glow around each unit
- Live updating to December 11, 2025

**CTAs:**
- Primary: "Register Now" (large, neon glow, pill-shaped)
- Secondary: "View Schedule" (outlined style)

## About Section

**Layout:** Two-column grid (text left, 3D illustration right)

**Content:**
"Mystery-us is a 3-day celebration by the MCA Department of Bangalore Institute of Technology. It unites seniors and juniors through culture, music, games, sports, and shared experiences. We celebrate who we are, where we come from, and the diversity we share as one family."

**Animations:**
- Cards slide in with spring animations on scroll
- Hover: lift up with shadow and glow
- 3D tilt effect on hover

## Days & Events Section (3-Card Journey)

### Day 1: Desi Day Out
- Cultural motifs background
- Floating flower petals/lanterns/mandala outlines
- Date: December 11, 2025 | Venue: 621 | Dress: Ethnic Wear
- Copy: "A day of colours, culture, and connection. Ethnic Day brings our campus together in the vibrant spirit of tradition."

### Day 2: Fresh O Mania
- Fresh gradients (cyan to purple)
- Subtle confetti/ribbons animation
- 3D stage spotlight effect
- Date: December 12, 2025 | 10:30 AM | Ramegowda Seminar Hall
- Welcoming message for freshers about growth and new possibilities

### Day 3: Sports Carnival
- High-energy vibe
- Glowing pill tags for sports: Gully Cricket, Volleyball (Men), Throwball (Women), Tug of War, Wrist/Hand Fight
- Each tag: hover tilt + glow

## Sports & Rules Section

**Grid of expandable cards** (5 sports total):

1. **Gully Cricket:** 8 players, 10 overs, knockout, sixes=OUT, powerplay doubles runs
2. **Volleyball (Men):** 6+2, best of 3, rally scoring
3. **Throwball (Women):** 7+2, overhead throw service, 3-second rule
4. **Tug of War:** 8 per team, center mark crossing
5. **Wrist/Hand Fight:** 1v1 knockout, best of 3 rounds

**Card Interactions:**
- Fade & slide up on scroll
- Hover: 3D tilt + neon border glow
- Click: Smooth expand with blur overlay or modal
- Full rules displayed on expansion

## Schedule Section

**Timeline Design:**
- Horizontal/vertical timeline with glowing nodes
- Icons: 🎭 Ethnic Day, 🎉 Freshers, 🏆 Sports
- Clickable nodes expand into cards with time slots
- Placeholder for detailed timings (to be updated)

## Registration Section

**Prominent glowing card:**
- Heading: "Register for Mystery-us"
- Copy: "Help us plan better! Fill the form for Ethnic Day, Freshers Party, and Sports."
- CTA Button: "Fill Registration Form" (large, pill-shaped, neon glow, hover lift)
- Placeholder: "Form Link (to be updated later)"

## Coordinators Section

**Profile Cards Grid:**
- Subsections: Faculty Coordinators, Student Coordinators, Tech & Design Team
- Each card: Circular image placeholder, Name, Role, Contact info
- Animations: Fade-in on scroll, hover scale + glow + shadow

## Gallery Section

**Responsive grid** with image placeholders:
- Ethnic outfits, performances, sports moments
- Hover: zoom-in + slight rotation
- Gradient cards with "Photo coming soon" for placeholders

## Footer

- Event name and institution
- "Designed for the MCA family – where mystery meets memories"
- Social icons (Instagram, email placeholders)
- © 2025 Mystery-us. All Rights Reserved
- Thin glowing top border
- Dark background matching theme

## Animation Specifications

- All animations: Smooth spring physics (Framer Motion style)
- Parallax scrolling for depth layers
- Hover states: 3D tilt, glow, shadow lift
- Scroll animations: Staggered fade-up, slide-in
- Micro-interactions on all clickable elements
- Smooth scroll behavior throughout