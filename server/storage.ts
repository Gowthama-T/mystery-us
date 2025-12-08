import { type User, type InsertUser, type Coordinator, type Event, type Schedule, type Sport } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCoordinators(): Promise<Coordinator[]>;
  getEvents(): Promise<Event[]>;
  getSchedules(): Promise<Schedule[]>;
  getSports(): Promise<Sport[]>;
}

const coordinatorsData: Coordinator[] = [
  {
    id: "3",
    name: "Girish",
    role: "Event Head",
    type: "student",
    year: "2nd Year MCA",
    phone: "8792705150",
  },
 
  {
    id: "5",
    name: "Sachin",
    role: "Sports Head",
    type: "student",
    year: "2nd Year MCA",
    phone: "9449444578",
  },

  {
    id: "7",
    name: "Gnanasharan",
    role: "Cultural Head",
    type: "student",
    year: "2nd Year MCA",
    phone: "6362894336",
  },
   {
    id: "4",
    name: "Likith",
    role: "Photography Head",
    type: "student",
    year: "2nd Year MCA",
    phone: "8105207880",
  },
  {
    id: "8",
    name: "Gowtham",
    role: "Tech Lead / Developer",
    type: "tech",
    year: "2nd Year MCA",
    phone: "9164893804",
  },
];



const eventsData: Event[] = [
  {
    id: 1,
    day: "Day 1",
    title: "Desi Day Out",
    subtitle: "Ethnic Day",
    date: "December 11, 2025",
    venue: "621",
    dressCode: "Ethnic Wear",
    color: "neon-gold",
    description: "A day of colours, culture, and connection. Ethnic Day brings our campus together in the vibrant spirit of tradition. It is a celebration of who we are, where we come from, and the beautiful diversity we share as one family.",
    highlights: ["Traditional Attire", "Cultural Performances", "Photo Sessions", "Unity Celebration"],
  },
  {
    id: 2,
    day: "Day 2",
    title: "Fresh O Mania",
    subtitle: "Freshers Day",
    date: "December 12, 2025",
    venue: "Ramegowda Seminar Hall",
    time: "10:30 AM",
    color: "neon-cyan",
    description: "Welcome, juniors, to the beginning of a journey filled with growth, curiosity, and new possibilities. As you enter the MCA family, you step into a space where ideas evolve, connections strengthen, and ambitions find direction.",
    extendedDescription: "This day marks the start of your path as learners, creators, and future innovators. We wish you a year filled with inspiration, confidence, and moments that turn into unforgettable memories. Here's to fresh beginnings and a future built with purpose.",
    highlights: ["Grand Welcome", "Talent Showcase", "Games & Fun", "New Friendships"],
  },
  {
    id: 3,
    day: "Day 3",
    title: "Sports & Spirit",
    subtitle: "Sports Carnival",
    date: "December 13, 2025",
    venue: "Sports Ground",
    dressCode: "Sports Wear",
    time: "9:00 AM onwards",
    color: "neon-purple",
    description: "From friendly rivalry to full-on adrenaline, Day 3 is all about sportsmanship, unity, and high energy. Compete, cheer, and celebrate the spirit of sports!",
    sports: ["Gully Cricket", "Volleyball (Men)", "Throwball (Women)", "Tug of War", "Wrist/Hand Fight"],
    highlights: ["Team Spirit", "Exciting Matches", "Cheering Crowd", "Victory Celebrations"],
  },
];

const schedulesData: Schedule[] = [
  {
    id: 1,
    day: "Day 1",
    title: "Desi Day Out",
    subtitle: "Ethnic Day",
    date: "December 11, 2025",
    venue: "621 Classroom (MCA Block)",
    color: "neon-gold",
    events: [
      { time: "1:00 PM", title: "Inauguration Ceremony", description: "Official event opening" },
      { time: "1:45 PM", title: "Cultural Performances", description: "Traditional dance & music" },
      { time: "3:30 PM", title: "Traditional Games", description: "Fun cultural activities" },
      { time: "4:30 PM", title: "Photo Sessions", description: "Group photos in ethnic wear" },
      { time: "5:00 PM", title: "Closing & Awards", description: "Best dressed awards" },
    ],
  },
{
    id: 2,
    day: "Day 2",
    title: "Fresh O Mania",
    subtitle: "Freshers Day",
    date: "December 12, 2025",
    venue: "Ramegowda Seminar Hall",
    color: "neon-cyan",
    events: [
      { time: "10:30 AM", title: "Welcome Assembly", description: "Grand fresher welcome" },
      { time: "11:30 AM", title: "Introduction Round", description: "Know your batchmates" },
      { time: "12:30 PM", title: "Talent Showcase", description: "Freshers perform" },
      { time: "1:30 PM", title: "Lunch Break", description: "Networking & bonding" },
      { time: "2:30 PM", title: "Fun Games & Activities", description: "Interactive games" },
      { time: "4:00 PM", title: "DJ & Dance", description: "Party time!" },
      { time: "5:30 PM", title: "Title Announcements", description: "Mr. & Ms. Fresher awards" },
    ],
  },
  {
    id: 3,
    day: "Day 3",
    title: "Sports Carnival",
    subtitle: "Sports & Spirit",
    date: "December 13, 2025",
    venue: "Sports Ground",
    color: "neon-purple",
    events: [
      { time: "9:00 AM", title: "Sports Day Inauguration", description: "Opening ceremony" },
      { time: "9:30 AM", title: "Gully Cricket - Round 1", description: "Knockout matches begin" },
      { time: "11:00 AM", title: "Volleyball Matches", description: "Men's volleyball" },
      { time: "12:00 PM", title: "Throwball Matches", description: "Women's throwball" },
      { time: "1:00 PM", title: "Lunch Break", description: "Recharge & regroup" },
      { time: "2:00 PM", title: "Tug of War", description: "Men & Women events" },
      { time: "3:30 PM", title: "Wrist/Hand Fight", description: "1v1 knockout rounds" },
      { time: "4:30 PM", title: "Cricket Finals", description: "Championship match" },
      { time: "5:30 PM", title: "Prize Distribution", description: "Winners celebration" },
    ],
  },
];

const sportsData: Sport[] = [
  {
    id: "cricket",
    name: "Gully Cricket",
    icon: "bat",
    teamSize: "8 players (7 + 1 sub)",
    format: "Knockout",
    color: "neon-cyan",
    rules: [
      "Matches are played on a knockout basis",
      "Each team: 8 players (7 on ground + 1 substitute)",
      "Match format: 10 overs total (5 overs per innings)",
      "Only one bowler can bowl 2 overs (not consecutive)",
      "All other bowlers can bowl only 1 over each",
      "Sixes are considered OUT. Only fours are allowed as boundaries",
      "Bowler must throw from inside the specified bowling box",
      "Over-stepping, bending knee, or lifting heel = no-ball (foul)",
      "One powerplay per innings: Runs in that over are doubled",
    ],
    highlights: ["Sixes = OUT", "Powerplay doubles runs", "Knockout format"],
  },
  {
    id: "volleyball",
    name: "Volleyball (Men)",
    icon: "volleyball",
    teamSize: "6 + 2 subs",
    format: "Best of 3",
    color: "neon-purple",
    rules: [
      "Team size: 6 players on court + 2 substitutes",
      "Match format: Best of 3 sets",
      "Serve from behind the baseline",
      "Scoring: Rally scoring – every rally wins a point",
      "Faults include: Touching the net, Crossing center line",
      "Double touch and carrying the ball are also faults",
      "Each set is played to 25 points (win by 2)",
      "Third set (if needed) played to 15 points",
    ],
    highlights: ["Rally scoring", "Best of 3 sets", "6v6 format"],
  },
  {
    id: "throwball",
    name: "Throwball (Women)",
    icon: "ball",
    teamSize: "7 + 2 subs",
    format: "Best of 3",
    color: "neon-gold",
    rules: [
      "Team size: 7 players on court + 2 substitutes",
      "Service: Overhead throw, must be thrown (not hit)",
      "Catch cleanly with both hands",
      "Throw within 3 seconds after catching",
      "No jumping while throwing",
      "No crossing the center line",
      "Rally point system for scoring",
      "Ball touching the net during service = fault",
    ],
    highlights: ["3-second rule", "No jumping", "Women's event"],
  },
  {
    id: "tugofwar",
    name: "Tug of War",
    icon: "rope",
    teamSize: "8 per team",
    format: "Single pull",
    color: "neon-pink",
    rules: [
      "Team size: 8 players per team (Men & Women separate)",
      "Pull begins on whistle signal",
      "Rope has a center mark for reference",
      "Win: Center mark must cross opponent's marker line",
      "No sitting or wrapping rope around body",
      "No sudden jerks allowed",
      "Feet must remain behind starting line until whistle",
      "Winner: Team that pulls rope mark past opponent's line",
    ],
    highlights: ["8v8 format", "Men & Women events", "Center mark win"],
  },
  {
    id: "wristfight",
    name: "Wrist / Hand Fight",
    icon: "hand",
    teamSize: "1 vs 1",
    format: "Best of 3 rounds",
    color: "neon-cyan",
    rules: [
      "Match format: 1 vs 1, knockout basis (Men & Women)",
      "Players face each other and grip right hands firmly",
      "Objective: Force opponent to release grip or lose balance",
      "Legal moves: Push, pull, twist, rotate within natural range",
      "Illegal: No pulling/bending single fingers",
      "Illegal: No hitting, slapping, scratching, or grabbing clothes",
      "Win: Opponent releases grip or touches ground (except feet)",
      "Each round is 30 seconds; Best of 3 rounds",
      "Stop immediately on referee's call or tap",
    ],
    highlights: ["30-sec rounds", "1v1 knockout", "Best of 3"],
  },
];

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCoordinators(): Promise<Coordinator[]> {
    return coordinatorsData;
  }

  async getEvents(): Promise<Event[]> {
    return eventsData;
  }

  async getSchedules(): Promise<Schedule[]> {
    return schedulesData;
  }

  async getSports(): Promise<Sport[]> {
    return sportsData;
  }
}

export const storage = new MemStorage();
