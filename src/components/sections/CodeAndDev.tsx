"use client";

import React, { memo, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, Github as GithubIcon } from "lucide-react";
import { ProblemsAnalyticsCard } from "@/components/ui/problems-analytics-card";
import {
  Chart,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/radar-chart";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip as LineChartTooltip,
  ChartTooltipContent as LineChartTooltipContent,
} from "@/components/ui/line-chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Chart as RadialChart,
  ChartTooltip as RadialChartTooltip,
  ChartTooltipContent as RadialChartTooltipContent,
} from "@/components/ui/radial-chart";
import { RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import {
  AnimatedCard,
  CardBody,
  CardDescription as AnimatedCardDescription,
  CardTitle as AnimatedCardTitle,
  CardVisual,
  Visual2,
} from "@/components/ui/animated-card-diagram";

// Types for API response (Coding profile)
interface BasicStats {
  total_questions: string;
  total_active_days: string;
  total_submissions: string;
  max_streak: string;
  current_streak: string;
  total_contests: string;
  awards: string;
}

interface ProblemsSolved {
  fundamentals: string;
  dsa: string;
  easy: string;
  medium: string;
  hard: string;
  competitive_programming: string;
  codechef: string;
  codeforces: string;
  hackerrank: string;
}

interface ContestRatings {
  leetcode: { rating: string };
  codechef: { rating: string };
  codeforces: { rating: string };
  hackerrank: { rating: string };
}

interface HeatmapEntry {
  date: string; // DD/MM/YYYY
  submissions: number;
  colorClass: string;
  styleColor: string;
}

interface ApiResponse {
  success: boolean;
  username: string;
  data: {
    basicStats: BasicStats;
    problemsSolved: ProblemsSolved;
    contestRankings: ContestRatings;
    heatmap: HeatmapEntry[];
    dsaTopics: Record<string, never>;
  };
}

// Types for GitHub user profile
interface GithubUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  name?: string;
  avatar_url?: string;
  html_url?: string;
}

// Types for GitHub calendar data
interface GithubCalendarResponse {
  total: number;
  contributions: Array<
    Array<{
      date: string;
      intensity: string;
      count: number;
    }>
  >;
}

const CODING_API_URL =
  "https://scraping-codolio.onrender.com/codolio/SambhavSurthi";
const CODING_CACHE_KEY = "coding_profile_cache_v1";

const GITHUB_API_URL = "https://api.github.com/users/SambhavSurthi";
const GITHUB_CACHE_KEY = "github_profile_cache_v1";

const GITHUB_CALENDAR_API_URL =
  "https://gh-calendar.rschristian.dev/user/SambhavSurthi?limit=1000";
const GITHUB_CALENDAR_CACHE_KEY = "github_calendar_cache_v1";

function getCached<T>(key: string): {
  payload: T | null;
  updatedAt: number | null;
} {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { payload: null, updatedAt: null };
    const parsed = JSON.parse(raw);
    return {
      payload: parsed.payload as T,
      updatedAt: parsed.updatedAt as number,
    };
  } catch {
    return { payload: null, updatedAt: null };
  }
}

function setCached<T>(key: string, payload: T) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({ payload, updatedAt: Date.now() })
    );
  } catch {}
}

async function fetchCodingProfile(): Promise<ApiResponse> {
  const res = await fetch(CODING_API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch coding profile");
  const data: ApiResponse = await res.json();
  if (!data.success) throw new Error("API returned unsuccessful response");
  return data;
}

async function fetchGithubProfile(): Promise<GithubUser> {
  const res = await fetch(GITHUB_API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch GitHub profile");
  const data: GithubUser = await res.json();
  return data;
}

async function fetchGithubCalendar(): Promise<GithubCalendarResponse> {
  const res = await fetch(GITHUB_CALENDAR_API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch GitHub calendar");
  const data: GithubCalendarResponse = await res.json();
  return data;
}

const LoadingSkeleton: React.FC = () => (
  <div className="grid gap-6 md:grid-cols-2">
    {Array.from({ length: 4 }).map((_, idx) => (
      <div
        key={idx}
        className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 animate-pulse h-64"
      />
    ))}
  </div>
);

const CodeAndDev: React.FC = () => {
  // Coding profile query with localStorage initial data
  const { payload: cachedCoding, updatedAt: cachedCodingUpdatedAt } = useMemo(
    () => getCached<ApiResponse>(CODING_CACHE_KEY),
    []
  );

  const codingQuery = useQuery<ApiResponse>({
    queryKey: ["coding-profile", { user: "SambhavSurthi" }],
    queryFn: fetchCodingProfile,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: "always",
    initialData: cachedCoding ?? undefined,
  });

  useEffect(() => {
    if (codingQuery.data && codingQuery.data.success) {
      setCached(CODING_CACHE_KEY, codingQuery.data);
    }
  }, [codingQuery.data]);

  const profile = codingQuery.data ?? cachedCoding ?? null;

  // GitHub profile query with localStorage initial data
  const { payload: cachedGithub } = useMemo(
    () => getCached<GithubUser>(GITHUB_CACHE_KEY),
    []
  );

  const githubQuery = useQuery<GithubUser>({
    queryKey: ["github-profile", { user: "SambhavSurthi" }],
    queryFn: fetchGithubProfile,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: "always",
    initialData: cachedGithub ?? undefined,
  });

  useEffect(() => {
    if (githubQuery.data) {
      setCached(GITHUB_CACHE_KEY, githubQuery.data);
    }
  }, [githubQuery.data]);

  const github = githubQuery.data ?? cachedGithub ?? null;

  // GitHub calendar query with localStorage initial data
  const { payload: cachedGithubCalendar } = useMemo(
    () => getCached<GithubCalendarResponse>(GITHUB_CALENDAR_CACHE_KEY),
    []
  );

  const githubCalendarQuery = useQuery<GithubCalendarResponse>({
    queryKey: ["github-calendar", { user: "SambhavSurthi" }],
    queryFn: fetchGithubCalendar,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: "always",
    initialData: cachedGithubCalendar ?? undefined,
  });

  useEffect(() => {
    if (githubCalendarQuery.data) {
      setCached(GITHUB_CALENDAR_CACHE_KEY, githubCalendarQuery.data);
    }
  }, [githubCalendarQuery.data]);

  const githubCalendar =
    githubCalendarQuery.data ?? cachedGithubCalendar ?? null;

  // Transform GitHub data for radial chart
  const radialChartData = useMemo(() => {
    if (!github || !githubCalendar) return [];
    return [
      {
        category: "Public Repos",
        value: github.public_repos,
        fill: "var(--color-repos)",
      },
      {
        category: "Total Contributions",
        value: githubCalendar.total,
        fill: "var(--color-contributions)",
      },
    ];
  }, [github, githubCalendar]);

  const easy = Number(profile?.data.problemsSolved.easy || 0);
  const medium = Number(profile?.data.problemsSolved.medium || 0);
  const hard = Number(profile?.data.problemsSolved.hard || 0);
  const total = easy + medium + hard;

  const b = profile?.data.basicStats;
  const streakData = useMemo(() => {
    if (!profile) return null;
    return {
      totalQuestions: Number(b?.total_questions || 0),
      totalActiveDays: Number(b?.total_active_days || 0),
      totalSubmissions: Number(b?.total_submissions || 0),
      maxStreak: Number(b?.max_streak || 0),
      currentStreak: Number(b?.current_streak || 0),
      totalContests: Number(b?.total_contests || 0),
    };
  }, [profile]);

  // Radar chart data mapping
  const radarData = useMemo(() => {
    if (!streakData) return [] as { metric: string; value: number }[];
    return [
      { metric: "Questions", value: streakData.totalQuestions },

      { metric: "Max Streak", value: streakData.maxStreak },
      { metric: "Submissions", value: streakData.totalSubmissions },
      { metric: "Current Streak", value: streakData.currentStreak },
      { metric: "Active Days", value: streakData.totalActiveDays },
      { metric: "Contests", value: streakData.totalContests },
    ];
  }, [streakData]);

  const chartConfig: ChartConfig = {
    value: {
      label: "Stat",
      color: "rgba(16,185,129,0.6)", // emerald
    },
  };

  const lineChartConfig = {
    submissions: {
      label: "Submissions",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const radialChartConfig = {
    value: {
      label: "Value",
    },
    repos: {
      label: "Public Repos",
      color: "#3B82F6", // Blue
    },
    contributions: {
      label: "Total Contributions",
      color: "#10B981", // Emerald
    },
  } satisfies ChartConfig;

  const recentHeatmap = useMemo(() => {
    if (!profile) return [] as HeatmapEntry[];
    const heat = profile.data.heatmap ?? [];
    console.log("Raw heatmap data:", heat);

    // Ensure we have data and take the last 7 entries
    if (heat.length === 0) {
      console.log("No heatmap data available");
      return [];
    }

    // Take last 7 entries (most recent week) - ensure we get exactly 7 days
    const last7Days = heat.slice(-7);
    console.log(
      "Heatmap data:",
      heat.length,
      "total entries, last 7:",
      last7Days.length,
      "entries:",
      last7Days
    );
    return last7Days;
  }, [profile]);

  // Transform heatmap data for line chart
  const lineChartData = useMemo(() => {
    if (!recentHeatmap.length) return [];
    const transformed = recentHeatmap.map((entry) => ({
      day: entry.date, // Use actual date from API
      submissions: entry.submissions,
      date: entry.date,
    }));
    console.log(
      "Line chart data:",
      transformed.length,
      "entries:",
      transformed
    );
    return transformed;
  }, [recentHeatmap]);

  // Calculate trend percentage
  const trendPercentage = useMemo(() => {
    if (lineChartData.length < 2) return 0;
    const first = lineChartData[0]?.submissions || 0;
    const last = lineChartData[lineChartData.length - 1]?.submissions || 0;
    if (first === 0) return last > 0 ? 100 : 0;
    return Math.round(((last - first) / first) * 100);
  }, [lineChartData]);

  const handleRefresh = async () => {
    toast.info("Updating coding profiles...");
    await Promise.all([
      codingQuery.refetch(),
      githubQuery.refetch(),
      githubCalendarQuery.refetch(),
    ]);
    toast.success("Coding profiles updated");
  };

  const updatedAtText = useMemo(() => {
    const ts = codingQuery.data ? Date.now() : cachedCodingUpdatedAt ?? null;
    if (!ts) return "Never";
    return new Date(ts).toLocaleString();
  }, [codingQuery.data, cachedCodingUpdatedAt]);

  const intensityClass = (submissions: number) => {
    if (submissions <= 0) return "bg-zinc-800";
    if (submissions <= 2) return "bg-emerald-800";
    if (submissions <= 5) return "bg-emerald-700";
    if (submissions <= 10) return "bg-emerald-500";
    return "bg-emerald-400";
  };

  const isFetchingAny =
    codingQuery.isFetching ||
    githubQuery.isFetching ||
    githubCalendarQuery.isFetching;

  return (
    <section className="w-full bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="text-sm text-zinc-400">
            Last updated: {updatedAtText}
          </div>
          <Button
            onClick={handleRefresh}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            disabled={isFetchingAny}
          >
            {isFetchingAny ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                Refreshing
              </span>
            ) : (
              <span>Refresh</span>
            )}
          </Button>
        </div>

        {!profile && codingQuery.isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {/* Row 1: Problems Solved Analytics Card */}
            <ProblemsAnalyticsCard
              total={total}
              easy={easy}
              medium={medium}
              hard={hard}
              className="w-full"
            />

            {/* Row 1: Streak & Activity (Radar) */}
            <div className="rounded-lg border border-zinc-900 bg-black p-6">
              <h3 className="mb-4 text-lg font-semibold">Streak & Activity</h3>
              {streakData ? (
                <>
                  {/* <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="rounded-md border border-zinc-800 bg-zinc-950 p-3">
                      <div className="text-zinc-400">Total Questions</div>
                      <div className="text-xl font-semibold">{streakData.totalQuestions}</div>
                    </div>
                    <div className="rounded-md border border-zinc-800 bg-zinc-950 p-3">
                      <div className="text-zinc-400">Active Days</div>
                      <div className="text-xl font-semibold">{streakData.totalActiveDays}</div>
                    </div>
                    <div className="rounded-md border border-zinc-800 bg-zinc-950 p-3">
                      <div className="text-zinc-400">Total Submissions</div>
                      <div className="text-xl font-semibold">{streakData.totalSubmissions}</div>
                    </div>
                    <div className="rounded-md border border-zinc-800 bg-zinc-950 p-3">
                      <div className="text-zinc-400">Current Streak</div>
                      <div className="text-xl font-semibold">{streakData.currentStreak}</div>
                    </div>
                  </div> */}

                  <Chart
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[420px]"
                  >
                    <RadarChart data={radarData}>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                      />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarGrid />
                      <Radar
                        dataKey="value"
                        fill="var(--color-value)"
                        fillOpacity={0.5}
                      />
                    </RadarChart>
                  </Chart>
                </>
              ) : (
                <div className="h-48 w-full animate-pulse rounded-md bg-zinc-800" />
              )}
            </div>

            {/* Row 2: Recent Activity Line Chart */}
            <Card className="border-zinc-900 bg-BLACK text-white">
              <CardHeader>
                <CardTitle className="text-white">
                  Recent Activity
                  {/* <Badge
                    variant="outline"
                    className={`ml-2 ${
                      trendPercentage >= 0 
                        ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/30" 
                        : "text-red-500 bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    <TrendingUp className={`h-4 w-4 ${trendPercentage < 0 ? "rotate-180" : ""}`} />
                    <span>{trendPercentage >= 0 ? "+" : ""}{trendPercentage}%</span>
                  </Badge> */}
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Last 7 days submission activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                {lineChartData.length > 0 ? (
                  <ChartContainer
                    config={lineChartConfig}
                    className="mx-auto aspect-video max-h-[400px] w-full"
                  >
                    <LineChart
                      accessibilityLayer
                      data={lineChartData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid
                        vertical={false}
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <XAxis
                        dataKey="day"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 10 }}
                        interval={0} // Show all ticks
                        tickFormatter={(value) => {
                          // Format date from DD/MM/YYYY to DD/MM
                          if (
                            typeof value === "string" &&
                            value.includes("/")
                          ) {
                            const parts = value.split("/");
                            if (parts.length === 3) {
                              return `${parts[0]}/${parts[1]}`;
                            }
                          }
                          return value;
                        }}
                      />
                      <LineChartTooltip
                        cursor={false}
                        content={<LineChartTooltipContent hideLabel />}
                      />
                      <Line
                        dataKey="submissions"
                        type="bump"
                        stroke="url(#rainbow-gradient)"
                        dot={false}
                        strokeWidth={3}
                        filter="url(#rainbow-line-glow)"
                      />
                      <defs>
                        <linearGradient
                          id="rainbow-gradient"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop
                            offset="0%"
                            stopColor="#0B84CE"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="20%"
                            stopColor="#224CD1"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="40%"
                            stopColor="#3A11C7"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="60%"
                            stopColor="#7107C6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="80%"
                            stopColor="#C900BD"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor="#D80155"
                            stopOpacity={0.8}
                          />
                        </linearGradient>
                        <filter
                          id="rainbow-line-glow"
                          x="-20%"
                          y="-20%"
                          width="140%"
                          height="140%"
                        >
                          <feGaussianBlur stdDeviation="8" result="blur" />
                          <feComposite
                            in="SourceGraphic"
                            in2="blur"
                            operator="over"
                          />
                        </filter>
                      </defs>
                    </LineChart>
                  </ChartContainer>
                ) : (
                  <div className="h-48 w-full animate-pulse rounded-md bg-zinc-800" />
                )}
              </CardContent>
            </Card>

            {/* Row 2: GitHub Animated Card */}
            <AnimatedCard className="border-zinc-900 bg-black text-white w-full">
              <CardVisual>
                <Visual2
                  mainColor="#3B82F6"
                  secondaryColor="#10B981"
                  mainValue={github?.public_repos || 0}
                  secondaryValue={githubCalendar?.total || 0}
                  mainLabel="Public Repos"
                  secondaryLabel="Contributions"
                />
              </CardVisual>
              <CardBody className="flex flex-col justify-between">
                <div>
                  <AnimatedCardTitle>GitHub Overview</AnimatedCardTitle>
                </div>
                <AnimatedCardDescription>
                  <div className="flex items-center gap-2">
                    <GithubIcon className="h-6 w-6" />
                    <span>GitHub</span>
                    <span>•</span>
                    <span>{github?.name || github?.login}</span>
                    <span>•</span>
                    <a
                      href={github?.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline"
                    >
                      View Profile
                    </a>
                  </div>
                </AnimatedCardDescription>
              </CardBody>
            </AnimatedCard>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(CodeAndDev);
