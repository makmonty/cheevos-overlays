export interface Game {
  Title: string;
  GameTitle: string;
  ConsoleID: number;
  ConsoleName: string;
  Console: string;
  ForumTopicID: number;
  Flags: number;
  GameIcon: string;
  ImageIcon: string;
  ImageTitle: string;
  ImageIngame: string;
  ImageBoxArt: string;
  Publisher: string;
  Developer: string;
  Genre: string;
  Released: string;
  ReleasedAtGranularity: string;
}

export interface Cheevo {
  ID: number;
  NumAwarded: number;
  NumAwardedHardcore: number;
  Title: string;
  Description: string;
  Points: number;
  TrueRatio: number;
  Author: string;
  DateModified: string;
  DateCreated: string;
  BadgeName: string;
  DisplayOrder: number;
  MemAddr: string;
  type: string;
  DateEarnedHardcore: string;
  DateEarned: string;
}

export interface GameProgress {
  ID: number;
  Title: string;
  ConsoleID: number;
  ForumTopicID: number;
  Flags: string | null;
  ImageIcon: string;
  ImageTitle: string;
  ImageIngame: string;
  ImageBoxArt: string;
  Publisher: string;
  Developer: string;
  Genre: string;
  Released: string;
  ReleasedAtGranularity: string;
  IsFinal: number;
  RichPresencePatch: string;
  players_total: number;
  achievements_published: number;
  points_total: number;
  GuideURL: string | null;
  ConsoleName: string;
  ParentGameID: string | null;
  NumDistinctPlayers: number;
  NumAchievements: number;
  Achievements: Record<string, Cheevo>;
  NumAwardedToUser: number;
  NumAwardedToUserHardcore: number;
  NumDistinctPlayersCasual: number;
  NumDistinctPlayersHardcore: number;
  UserCompletion: string;
  UserCompletionHardcore: string;
  HighestAwardKind: string;
  HighestAwardDate: string;
}

export interface UserProfile {
  User: string;
  UserPic: string;
  MemberSince: string;
  RichPresenceMsg: string;
  LastGameID: number;
  ContribCount: number;
  ContribYield: number;
  TotalPoints: number;
  TotalSoftcorePoints: number;
  TotalTruePoints: number;
  Permissions: number;
  Untracked: number;
  ID: number;
  UserWallActive: boolean;
  Motto: string;
}

export interface UserSummary {
  User: string;
  MemberSince: string;
  LastActivity: {
    ID: number;
    timestamp: string;
    lastupdate: string;
    activitytype: string;
    User: string;
    data: string;
    data2: string;
  };
  RichPresenceMsg: string;
  LastGameID: number;
  ContribCount: number;
  ContribYield: number;
  TotalPoints: number;
  TotalSoftcorePoints: number;
  TotalTruePoints: number;
  Permissions: number;
  Untracked: number;
  ID: number;
  UserWallActive: number;
  Motto: string;
  Rank: number;
  RecentlyPlayedCount: number;
  RecentlyPlayed: {
    GameID: number;
    ConsoleID: number;
    ConsoleName: string;
    Title: string;
    ImageIcon: string;
    ImageTitle: string;
    ImageIngame: string;
    ImageBoxArt: string;
    LastPlayed: string;
    AchievementsTotal: number;
  }[];
  Awarded: Record<
    string,
    {
      NumPossibleAchievements: number;
      PossibleScore: number;
      NumAchieved: number;
      ScoreAchieved: number;
      NumAchievedHardcore: number;
      ScoreAchievedHardcore: number;
    }
  >;
  RecentAchievements: Record<string, Record<string, Cheevo>>;
  LastGame: {
    ID: number;
    Title: string;
    ConsoleID: number;
    ConsoleName: string;
    ForumTopicID: number;
    Flags: number;
    ImageIcon: string;
    ImageTitle: string;
    ImageIngame: string;
    ImageBoxArt: string;
    Publisher: string;
    Developer: string;
    Genre: string;
    Released: string;
    IsFinal: number;
  };
  UserPic: string;
  TotalRanked: number;
  Status: string;
}
