import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Download,
  Film,
  Image as ImageIcon,
  Lock,
  Play,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
  Upload,
  XCircle,
  Zap,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

const PASSWORD = "amar2026";

// ─── Types ────────────────────────────────────────────────────────────────────

type FileStatus = "Queued" | "Processing" | "Done" | "Failed";
type QueueStatus = "Pending" | "Approved" | "Rejected";
type CropType = "portrait-square" | "food-4-3";

interface ProcessingFile {
  id: number;
  name: string;
  type: "image" | "video";
  aunty: string;
  sizeMb: number;
  status: FileStatus;
  progress: number;
}

interface SampleImage {
  id: number;
  name: string;
  aunty: string;
  qualityScore: number;
  originalKb: number;
  optimisedKb: number;
  flags: string[];
  cropType: CropType;
  compress: boolean;
  brightnessfix: boolean;
  bgblur: boolean;
  approved: boolean | null;
}

interface SampleVideo {
  id: number;
  name: string;
  aunty: string;
  originalMb: number;
  compressedMb: number;
  qualityFlags: string[];
  selectedThumb: number | null;
  approved: boolean | null;
}

interface QueueItem {
  id: number;
  aunty: string;
  fileName: string;
  type: "Image" | "Video";
  originalSize: string;
  optimisedSize: string;
  qualityScore: number;
  status: QueueStatus;
  date: string;
  selected: boolean;
}

// ─── Sample Data ──────────────────────────────────────────────────────────────

const INITIAL_IMAGES: SampleImage[] = [
  {
    id: 1,
    name: "profile_anju_devi.jpg",
    aunty: "Anju Devi",
    qualityScore: 82,
    originalKb: 1240,
    optimisedKb: 187,
    flags: [],
    cropType: "portrait-square",
    compress: true,
    brightnessfix: false,
    bgblur: true,
    approved: null,
  },
  {
    id: 2,
    name: "achar_product_001.jpg",
    aunty: "Sunita Yadav",
    qualityScore: 34,
    originalKb: 3870,
    optimisedKb: 198,
    flags: ["Too Dark", "Blurry"],
    cropType: "food-4-3",
    compress: true,
    brightnessfix: true,
    bgblur: false,
    approved: null,
  },
  {
    id: 3,
    name: "laddoo_festive_hero.png",
    aunty: "Priya Sharma",
    qualityScore: 61,
    originalKb: 2150,
    optimisedKb: 192,
    flags: ["Wrong Dimensions"],
    cropType: "food-4-3",
    compress: true,
    brightnessfix: true,
    bgblur: false,
    approved: null,
  },
  {
    id: 4,
    name: "namkeen_kitchen_shot.jpg",
    aunty: "Meena Kumari",
    qualityScore: 91,
    originalKb: 980,
    optimisedKb: 174,
    flags: [],
    cropType: "food-4-3",
    compress: true,
    brightnessfix: false,
    bgblur: false,
    approved: null,
  },
];

const INITIAL_VIDEOS: SampleVideo[] = [
  {
    id: 1,
    name: "aunty_kitchen_story.mp4",
    aunty: "Anju Devi",
    originalMb: 142,
    compressedMb: 38,
    qualityFlags: [],
    selectedThumb: null,
    approved: null,
  },
  {
    id: 2,
    name: "mithila_product_reel.mov",
    aunty: "Sunita Yadav",
    originalMb: 287,
    compressedMb: 61,
    qualityFlags: ["Poor Lighting"],
    selectedThumb: null,
    approved: null,
  },
];

const INITIAL_QUEUE: QueueItem[] = [
  {
    id: 1,
    aunty: "Anju Devi",
    fileName: "profile_anju_devi_opt.jpg",
    type: "Image",
    originalSize: "1.2 MB",
    optimisedSize: "187 KB",
    qualityScore: 82,
    status: "Pending",
    date: "2026-03-10",
    selected: false,
  },
  {
    id: 2,
    aunty: "Priya Sharma",
    fileName: "laddoo_festive_hero_opt.jpg",
    type: "Image",
    originalSize: "2.1 MB",
    optimisedSize: "192 KB",
    qualityScore: 61,
    status: "Pending",
    date: "2026-03-10",
    selected: false,
  },
  {
    id: 3,
    aunty: "Meena Kumari",
    fileName: "namkeen_kitchen_opt.jpg",
    type: "Image",
    originalSize: "980 KB",
    optimisedSize: "174 KB",
    qualityScore: 91,
    status: "Approved",
    date: "2026-03-09",
    selected: false,
  },
  {
    id: 4,
    aunty: "Rekha Joshi",
    fileName: "masala_mix_reel.mp4",
    type: "Video",
    originalSize: "98 MB",
    optimisedSize: "24 MB",
    qualityScore: 73,
    status: "Approved",
    date: "2026-03-09",
    selected: false,
  },
  {
    id: 5,
    aunty: "Sunita Yadav",
    fileName: "achar_product_001_opt.jpg",
    type: "Image",
    originalSize: "3.8 MB",
    optimisedSize: "198 KB",
    qualityScore: 34,
    status: "Rejected",
    date: "2026-03-08",
    selected: false,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function qualityColor(score: number) {
  if (score >= 70) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (score >= 40) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-red-600 bg-red-50 border-red-200";
}

function qualityBarColor(score: number) {
  if (score >= 70) return "bg-emerald-500";
  if (score >= 40) return "bg-amber-500";
  return "bg-red-500";
}

function statusBadge(status: QueueStatus) {
  if (status === "Approved")
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (status === "Rejected") return "bg-red-100 text-red-700 border-red-200";
  return "bg-amber-100 text-amber-700 border-amber-200";
}

function fileStatusBadge(status: FileStatus) {
  if (status === "Done") return "bg-emerald-100 text-emerald-700";
  if (status === "Failed") return "bg-red-100 text-red-700";
  if (status === "Processing") return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-600";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function QualityScoreBadge({ score }: { score: number }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold ${qualityColor(score)}`}
    >
      <span>{score}/100</span>
      {score >= 70 && <CheckCircle className="w-3.5 h-3.5" />}
      {score >= 40 && score < 70 && <AlertTriangle className="w-3.5 h-3.5" />}
      {score < 40 && <XCircle className="w-3.5 h-3.5" />}
    </div>
  );
}

function QualityBar({ score }: { score: number }) {
  return (
    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ${qualityBarColor(score)}`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

function ImagePlaceholder({
  label,
  score,
  isAfter,
}: {
  label: string;
  score: number;
  isAfter?: boolean;
}) {
  const hue = isAfter ? (score >= 70 ? 150 : score >= 40 ? 45 : 0) : 30;
  const patterns = [
    `radial-gradient(circle at 30% 40%, oklch(0.82 0.08 ${hue}) 0%, oklch(0.65 0.12 ${hue + 20}) 60%, oklch(0.5 0.1 ${hue + 40}) 100%)`,
    `linear-gradient(135deg, oklch(0.78 0.1 ${hue}) 0%, oklch(0.62 0.14 ${hue + 30}) 100%)`,
    `radial-gradient(ellipse at 70% 60%, oklch(0.85 0.06 ${hue}) 0%, oklch(0.58 0.15 ${hue + 50}) 100%)`,
    `conic-gradient(from 45deg, oklch(0.75 0.09 ${hue}), oklch(0.68 0.12 ${hue + 60}), oklch(0.75 0.09 ${hue}))`,
  ];
  const idx = label.length % patterns.length;
  return (
    <div
      className="w-full h-32 rounded-lg flex items-end p-2"
      style={{ background: patterns[idx] }}
    >
      <span className="text-xs font-medium text-white/90 bg-black/30 px-2 py-0.5 rounded-full">
        {label}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MediaOptimiser() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);

  // Upload tab
  const [auntyName, setAuntyName] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [processingFiles, setProcessingFiles] = useState<ProcessingFile[]>([]);
  const [nextFileId, setNextFileId] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image tab
  const [images, setImages] = useState<SampleImage[]>(INITIAL_IMAGES);

  // Video tab
  const [videos, setVideos] = useState<SampleVideo[]>(INITIAL_VIDEOS);

  // Queue tab
  const [queue, setQueue] = useState<QueueItem[]>(INITIAL_QUEUE);

  function handleLogin() {
    if (pw === PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(Array.from(e.dataTransfer.files));
  }, []);

  function addFiles(fileList: File[]) {
    const allowed = fileList
      .filter((f) =>
        [
          "image/jpeg",
          "image/png",
          "image/webp",
          "video/mp4",
          "video/quicktime",
        ].includes(f.type),
      )
      .slice(0, 20);
    if (!allowed.length) return;
    let id = nextFileId;
    const newFiles: ProcessingFile[] = allowed.map((f) => ({
      id: id++,
      name: f.name,
      type: f.type.startsWith("video") ? "video" : "image",
      aunty: auntyName || "Unknown Aunty",
      sizeMb: Math.round((f.size / 1048576) * 100) / 100,
      status: "Queued",
      progress: 0,
    }));
    setNextFileId(id);
    setProcessingFiles((prev) => [...prev, ...newFiles]);
  }

  function processAll() {
    setProcessingFiles((prev) =>
      prev.map((f) =>
        f.status === "Queued" ? { ...f, status: "Processing", progress: 0 } : f,
      ),
    );
    // Simulate progress per file
    const queued = processingFiles.filter((f) => f.status === "Queued");
    for (const file of queued) {
      let p = 0;
      const iv = setInterval(() => {
        p += Math.random() * 22 + 8;
        if (p >= 100) {
          p = 100;
          clearInterval(iv);
          setProcessingFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? {
                    ...f,
                    status: Math.random() > 0.1 ? "Done" : "Failed",
                    progress: 100,
                  }
                : f,
            ),
          );
        } else {
          setProcessingFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, progress: Math.round(p) } : f,
            ),
          );
        }
      }, 300);
    }
  }

  // ── Image Optimiser actions ────────────────────────────────────────────────
  function toggleImageOpt(id: number, key: keyof SampleImage) {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, [key]: !(img as any)[key] } : img,
      ),
    );
  }

  function setImageCrop(id: number, cropType: CropType) {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, cropType } : img)),
    );
  }

  function approveImage(id: number, approved: boolean) {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, approved } : img)),
    );
    if (approved) {
      const img = images.find((i) => i.id === id)!;
      setQueue((prev) => [
        {
          id: Date.now(),
          aunty: img.aunty,
          fileName: img.name.replace(/\.[^.]+$/, "_opt.jpg"),
          type: "Image",
          originalSize: `${(img.originalKb / 1024).toFixed(1)} MB`,
          optimisedSize: `${img.optimisedKb} KB`,
          qualityScore: img.qualityScore,
          status: "Pending",
          date: new Date().toISOString().slice(0, 10),
          selected: false,
        },
        ...prev,
      ]);
    }
  }

  // ── Video Optimiser actions ────────────────────────────────────────────────
  function selectThumb(videoId: number, thumb: number) {
    setVideos((prev) =>
      prev.map((v) => (v.id === videoId ? { ...v, selectedThumb: thumb } : v)),
    );
  }

  function approveVideo(id: number, approved: boolean) {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, approved } : v)),
    );
    if (approved) {
      const vid = videos.find((v) => v.id === id)!;
      setQueue((prev) => [
        {
          id: Date.now(),
          aunty: vid.aunty,
          fileName: vid.name.replace(/\.[^.]+$/, "_opt.mp4"),
          type: "Video",
          originalSize: `${vid.originalMb} MB`,
          optimisedSize: `${vid.compressedMb} MB`,
          qualityScore: vid.qualityFlags.length === 0 ? 78 : 55,
          status: "Pending",
          date: new Date().toISOString().slice(0, 10),
          selected: false,
        },
        ...prev,
      ]);
    }
  }

  // ── Queue actions ──────────────────────────────────────────────────────────
  function queueAction(id: number, action: "approve" | "reject" | "reprocess") {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status:
                action === "approve"
                  ? "Approved"
                  : action === "reject"
                    ? "Rejected"
                    : "Pending",
            }
          : item,
      ),
    );
  }

  function toggleSelect(id: number) {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  }

  function approveSelected() {
    setQueue((prev) =>
      prev.map((item) =>
        item.selected ? { ...item, status: "Approved", selected: false } : item,
      ),
    );
  }

  function toggleSelectAll(checked: boolean) {
    setQueue((prev) => prev.map((item) => ({ ...item, selected: checked })));
  }

  // ── Computed stats ─────────────────────────────────────────────────────────
  const pendingCount = queue.filter((q) => q.status === "Pending").length;
  const approvedToday = queue.filter(
    (q) =>
      q.status === "Approved" &&
      q.date === new Date().toISOString().slice(0, 10),
  ).length;
  const rejectedCount = queue.filter((q) => q.status === "Rejected").length;
  const anySelected = queue.some((q) => q.selected);
  const allSelected = queue.length > 0 && queue.every((q) => q.selected);

  // ── Password gate ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <Card className="w-full max-w-sm shadow-xl border-slate-200">
          <CardHeader className="text-center pb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="font-display text-xl text-slate-800">
              Media Optimiser
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Admin / Ops access only
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              type="password"
              placeholder="Enter password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setPwError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              data-ocid="media.input"
              className={pwError ? "border-red-400" : ""}
            />
            {pwError && (
              <p className="text-red-500 text-xs">Incorrect password</p>
            )}
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleLogin}
              data-ocid="media.primary_button"
            >
              <Lock className="w-4 h-4 mr-2" /> Access Optimiser
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  // ── Main UI ────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-800">
                Media Optimiser
              </h1>
              <p className="text-sm text-muted-foreground">
                Process · Enhance · Approve — before it goes live
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs gap-1">
              <ImageIcon className="w-3 h-3" />
              {images.filter((i) => i.approved !== null).length}/{images.length}{" "}
              images reviewed
            </Badge>
            <Badge variant="outline" className="text-xs gap-1">
              <Film className="w-3 h-3" />
              {videos.filter((v) => v.approved !== null).length}/{videos.length}{" "}
              videos reviewed
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="upload" data-ocid="media.tab">
          <TabsList className="bg-white border border-slate-200 shadow-sm mb-6 h-11">
            <TabsTrigger
              value="upload"
              className="text-sm gap-1.5"
              data-ocid="media.upload.tab"
            >
              <Upload className="w-3.5 h-3.5" /> Upload & Process
            </TabsTrigger>
            <TabsTrigger
              value="images"
              className="text-sm gap-1.5"
              data-ocid="media.images.tab"
            >
              <ImageIcon className="w-3.5 h-3.5" /> Image Optimiser
            </TabsTrigger>
            <TabsTrigger
              value="videos"
              className="text-sm gap-1.5"
              data-ocid="media.videos.tab"
            >
              <Film className="w-3.5 h-3.5" /> Video Optimiser
            </TabsTrigger>
            <TabsTrigger
              value="queue"
              className="text-sm gap-1.5 relative"
              data-ocid="media.queue.tab"
            >
              <CheckCircle className="w-3.5 h-3.5" /> Approved Queue
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ── TAB 1: Upload & Process ──────────────────────────────────── */}
          <TabsContent value="upload" className="space-y-6">
            {/* Aunty tag input */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-display text-slate-700">
                  Tag Files to an Aunty
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  All files in this upload batch will be tagged to this aunty
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 items-center">
                  <Input
                    placeholder="Aunty name (e.g. Anju Devi)"
                    value={auntyName}
                    onChange={(e) => setAuntyName(e.target.value)}
                    className="max-w-xs"
                    data-ocid="media.input"
                  />
                  <p className="text-xs text-muted-foreground">
                    JPG · PNG · WebP · MP4 · MOV · Max 20 files
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Drop zone */}
            <button
              type="button"
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              data-ocid="media.dropzone"
              className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                dragOver
                  ? "border-blue-500 bg-blue-50 scale-[1.01]"
                  : "border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime"
                className="hidden"
                onChange={(e) => addFiles(Array.from(e.target.files ?? []))}
              />
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <p className="font-semibold text-slate-700 text-lg mb-1">
                {dragOver ? "Drop files here" : "Drag & drop files here"}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse
              </p>
              <Button
                variant="outline"
                className="pointer-events-none"
                data-ocid="media.upload_button"
              >
                <Upload className="w-4 h-4 mr-2" /> Browse Files
              </Button>
            </button>

            {/* Processing queue */}
            {processingFiles.length > 0 && (
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-display text-slate-700">
                    Processing Queue ({processingFiles.length} files)
                  </CardTitle>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white h-8"
                    onClick={processAll}
                    disabled={
                      !processingFiles.some((f) => f.status === "Queued")
                    }
                    data-ocid="media.primary_button"
                  >
                    <Zap className="w-3.5 h-3.5 mr-1.5" /> Process All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {processingFiles.map((file, idx) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                      data-ocid={`media.queue.item.${idx + 1}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          file.type === "video"
                            ? "bg-purple-100"
                            : "bg-blue-100"
                        }`}
                      >
                        {file.type === "video" ? (
                          <Film className="w-4 h-4 text-purple-600" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-slate-700 truncate">
                            {file.name}
                          </p>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ml-2 shrink-0 ${fileStatusBadge(file.status)}`}
                          >
                            {file.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">
                            {file.aunty} · {file.sizeMb} MB
                          </p>
                        </div>
                        {file.status === "Processing" && (
                          <div className="mt-1.5">
                            <Progress value={file.progress} className="h-1.5" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {processingFiles.length === 0 && (
                    <div
                      className="text-center py-8 text-muted-foreground text-sm"
                      data-ocid="media.queue.empty_state"
                    >
                      No files uploaded yet
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ── TAB 2: Image Optimiser ───────────────────────────────────── */}
          <TabsContent value="images" className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {images.filter((i) => i.approved === true).length} approved ·{" "}
                {images.filter((i) => i.approved === false).length} rejected ·{" "}
                {images.filter((i) => i.approved === null).length} pending
                review
              </p>
            </div>

            {images.map((img, idx) => (
              <Card
                key={img.id}
                className={`shadow-sm border transition-all ${
                  img.approved === true
                    ? "border-emerald-300 bg-emerald-50/30"
                    : img.approved === false
                      ? "border-red-300 bg-red-50/20 opacity-70"
                      : "border-slate-200"
                }`}
                data-ocid={`media.image.item.${idx + 1}`}
              >
                <CardContent className="pt-5 pb-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Before / After previews */}
                    <div className="lg:col-span-1 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1.5">
                            Before
                          </p>
                          <ImagePlaceholder
                            label={`${img.originalKb} KB`}
                            score={img.qualityScore}
                          />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1.5">
                            After
                          </p>
                          <ImagePlaceholder
                            label={`${img.optimisedKb} KB`}
                            score={img.qualityScore}
                            isAfter
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <QualityScoreBadge score={img.qualityScore} />
                        <span className="text-xs text-emerald-600 font-semibold">
                          -
                          {Math.round(
                            ((img.originalKb - img.optimisedKb) /
                              img.originalKb) *
                              100,
                          )}
                          % size
                        </span>
                      </div>
                      <QualityBar score={img.qualityScore} />
                    </div>

                    {/* Options */}
                    <div className="lg:col-span-1 space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                          Processing Options
                        </p>
                        <div className="space-y-2">
                          {(
                            [
                              [
                                "compress",
                                `Auto-compress (${img.originalKb}KB → <200KB)`,
                              ],
                              [
                                "brightnessfix",
                                "Brightness / Contrast / Sharpness fix",
                              ],
                              ["bgblur", "Background blur (portrait)"],
                            ] as [keyof SampleImage, string][]
                          ).map(([key, label]) => (
                            <div key={key} className="flex items-center gap-2">
                              <Checkbox
                                id={`${img.id}-${key}`}
                                checked={!!img[key]}
                                onCheckedChange={() =>
                                  toggleImageOpt(img.id, key)
                                }
                                data-ocid={`media.image.checkbox.${idx + 1}`}
                              />
                              <Label
                                htmlFor={`${img.id}-${key}`}
                                className="text-xs text-slate-600 cursor-pointer"
                              >
                                {label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                          Auto-crop
                        </p>
                        <div className="flex gap-2">
                          {(["portrait-square", "food-4-3"] as CropType[]).map(
                            (ct) => (
                              <button
                                type="button"
                                key={ct}
                                onClick={() => setImageCrop(img.id, ct)}
                                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                                  img.cropType === ct
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                                }`}
                              >
                                {ct === "portrait-square"
                                  ? "Portrait 1:1"
                                  : "Food 4:3"}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Info + flags + actions */}
                    <div className="lg:col-span-1 flex flex-col justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-700 mb-0.5">
                          {img.name}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                          {img.aunty}
                        </p>

                        {img.flags.length > 0 && (
                          <div className="space-y-1 mb-3">
                            {img.flags.map((flag) => (
                              <div
                                key={flag}
                                className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1"
                              >
                                <AlertTriangle className="w-3 h-3 shrink-0" />
                                {flag}
                              </div>
                            ))}
                          </div>
                        )}

                        {img.flags.length === 0 && (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 mb-3">
                            <CheckCircle className="w-3 h-3" /> No quality
                            issues detected
                          </div>
                        )}
                      </div>

                      {img.approved === null ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 h-8 bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                            onClick={() => approveImage(img.id, true)}
                            data-ocid={`media.image.confirm_button.${idx + 1}`}
                          >
                            <ThumbsUp className="w-3 h-3 mr-1" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 h-8 text-red-600 border-red-200 hover:bg-red-50 text-xs"
                            onClick={() => approveImage(img.id, false)}
                            data-ocid={`media.image.delete_button.${idx + 1}`}
                          >
                            <ThumbsDown className="w-3 h-3 mr-1" /> Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-slate-500"
                            onClick={() =>
                              setImages((prev) =>
                                prev.map((i) =>
                                  i.id === img.id
                                    ? {
                                        ...i,
                                        qualityScore: Math.min(
                                          100,
                                          i.qualityScore + 5,
                                        ),
                                      }
                                    : i,
                                ),
                              )
                            }
                            data-ocid={`media.image.secondary_button.${idx + 1}`}
                          >
                            <RefreshCw className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <div
                          className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg ${
                            img.approved
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {img.approved ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5" /> Approved —
                              sent to queue
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" /> Rejected
                            </>
                          )}
                          <button
                            type="button"
                            className="ml-auto text-muted-foreground hover:text-foreground"
                            onClick={() =>
                              setImages((prev) =>
                                prev.map((i) =>
                                  i.id === img.id
                                    ? { ...i, approved: null }
                                    : i,
                                ),
                              )
                            }
                          >
                            <RefreshCw className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ── TAB 3: Video Optimiser ───────────────────────────────────── */}
          <TabsContent value="videos" className="space-y-5">
            {videos.map((vid, idx) => (
              <Card
                key={vid.id}
                className={`shadow-sm border transition-all ${
                  vid.approved === true
                    ? "border-emerald-300 bg-emerald-50/30"
                    : vid.approved === false
                      ? "border-red-300 bg-red-50/20 opacity-70"
                      : "border-slate-200"
                }`}
                data-ocid={`media.video.item.${idx + 1}`}
              >
                <CardContent className="pt-5 pb-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Video player placeholder */}
                    <div className="lg:col-span-1">
                      <div className="bg-slate-900 rounded-xl aspect-video flex items-center justify-center mb-3 relative overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            background:
                              "radial-gradient(circle at 40% 50%, oklch(0.45 0.15 250), oklch(0.2 0.05 260))",
                          }}
                        />
                        <button
                          type="button"
                          className="relative w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                        >
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        </button>
                        <span className="absolute bottom-2 right-2 text-xs text-white/70 bg-black/40 px-2 py-0.5 rounded">
                          30s preview
                        </span>
                      </div>

                      {/* Compression stats */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-slate-100 rounded-lg p-2">
                          <p className="text-xs text-muted-foreground">
                            Original
                          </p>
                          <p className="text-sm font-bold text-slate-700">
                            {vid.originalMb} MB
                          </p>
                        </div>
                        <div className="flex items-center justify-center">
                          <ChevronDown className="w-4 h-4 text-emerald-500 rotate-[-90deg]" />
                        </div>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2">
                          <p className="text-xs text-emerald-600">Compressed</p>
                          <p className="text-sm font-bold text-emerald-700">
                            {vid.compressedMb} MB
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-center text-emerald-600 font-semibold mt-1.5">
                        {Math.round(
                          ((vid.originalMb - vid.compressedMb) /
                            vid.originalMb) *
                            100,
                        )}
                        % saved
                      </p>
                    </div>

                    {/* Thumbnails */}
                    <div className="lg:col-span-1">
                      <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                        Select Thumbnail
                      </p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {["0s", "15s", "30s"].map((t, ti) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => selectThumb(vid.id, ti)}
                            data-ocid={`media.video.toggle.${idx + 1}`}
                            className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                              vid.selectedThumb === ti
                                ? "border-blue-500 shadow-md scale-105"
                                : "border-slate-200 hover:border-blue-300"
                            }`}
                          >
                            <div
                              className="aspect-video"
                              style={{
                                background: `hsl(${220 + ti * 30}, 40%, ${35 + ti * 8}%)`,
                              }}
                            />
                            <span
                              className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                vid.selectedThumb === ti
                                  ? "bg-blue-500 text-white"
                                  : "bg-black/50 text-white/90"
                              }`}
                            >
                              {t}
                            </span>
                          </button>
                        ))}
                      </div>
                      {vid.selectedThumb === null && (
                        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
                          <AlertTriangle className="w-3 h-3 inline mr-1" />
                          Please select a thumbnail before approving
                        </p>
                      )}
                      {vid.selectedThumb !== null && (
                        <p className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5">
                          <CheckCircle className="w-3 h-3 inline mr-1" />
                          Thumbnail at {["0s", "15s", "30s"][vid.selectedThumb]}{" "}
                          selected
                        </p>
                      )}
                    </div>

                    {/* Info + flags + actions */}
                    <div className="lg:col-span-1 flex flex-col justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-700 mb-0.5">
                          {vid.name}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                          {vid.aunty}
                        </p>

                        {vid.qualityFlags.length > 0 ? (
                          <div className="space-y-1.5 mb-3">
                            {vid.qualityFlags.map((flag) => (
                              <div
                                key={flag}
                                className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5"
                              >
                                <AlertTriangle className="w-3 h-3 shrink-0" />{" "}
                                {flag}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5 mb-3">
                            <CheckCircle className="w-3 h-3" /> No quality
                            issues detected
                          </div>
                        )}

                        <div className="text-xs text-slate-500 space-y-0.5">
                          <p>✓ Compressed to web-ready size</p>
                          <p>✓ 30s preview clip extracted</p>
                          <p>
                            {vid.selectedThumb !== null ? "✓" : "○"} Thumbnail
                            {vid.selectedThumb !== null
                              ? " selected"
                              : " not yet selected"}
                          </p>
                        </div>
                      </div>

                      {vid.approved === null ? (
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            className="flex-1 h-8 bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                            onClick={() => approveVideo(vid.id, true)}
                            disabled={vid.selectedThumb === null}
                            data-ocid={`media.video.confirm_button.${idx + 1}`}
                          >
                            <ThumbsUp className="w-3 h-3 mr-1" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 h-8 text-red-600 border-red-200 hover:bg-red-50 text-xs"
                            onClick={() => approveVideo(vid.id, false)}
                            data-ocid={`media.video.delete_button.${idx + 1}`}
                          >
                            <ThumbsDown className="w-3 h-3 mr-1" /> Reject
                          </Button>
                        </div>
                      ) : (
                        <div
                          className={`flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg mt-4 ${
                            vid.approved
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {vid.approved ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5" /> Approved
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" /> Rejected
                            </>
                          )}
                          <button
                            type="button"
                            className="ml-auto text-muted-foreground hover:text-foreground"
                            onClick={() =>
                              setVideos((prev) =>
                                prev.map((v) =>
                                  v.id === vid.id
                                    ? { ...v, approved: null }
                                    : v,
                                ),
                              )
                            }
                          >
                            <RefreshCw className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ── TAB 4: Approved Queue ────────────────────────────────────── */}
          <TabsContent value="queue" className="space-y-4">
            {/* Summary bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Pending Review",
                  value: pendingCount,
                  color: "text-amber-600",
                  bg: "bg-amber-50 border-amber-200",
                },
                {
                  label: "Approved Today",
                  value: approvedToday,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50 border-emerald-200",
                },
                {
                  label: "Rejected",
                  value: rejectedCount,
                  color: "text-red-600",
                  bg: "bg-red-50 border-red-200",
                },
                {
                  label: "Storage Saved",
                  value: "14.2 MB",
                  color: "text-blue-600",
                  bg: "bg-blue-50 border-blue-200",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-xl border p-3 ${stat.bg}`}
                >
                  <p className={`text-xl font-bold font-display ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Bulk action bar */}
            {anySelected && (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5">
                <p className="text-sm text-blue-700 font-medium">
                  {queue.filter((q) => q.selected).length} item(s) selected
                </p>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white h-8"
                  onClick={approveSelected}
                  data-ocid="media.queue.confirm_button"
                >
                  <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Approve
                  Selected
                </Button>
              </div>
            )}

            {/* Queue table */}
            {queue.length === 0 ? (
              <Card className="shadow-sm border-slate-200">
                <CardContent
                  className="py-16 text-center"
                  data-ocid="media.queue.empty_state"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-slate-500 font-medium">Queue is empty</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Approved images and videos will appear here
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-sm border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table
                    className="w-full text-sm"
                    data-ocid="media.queue.table"
                  >
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="p-3 text-left w-10">
                          <Checkbox
                            checked={allSelected}
                            onCheckedChange={(c) => toggleSelectAll(!!c)}
                            data-ocid="media.queue.checkbox"
                          />
                        </th>
                        <th className="p-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Aunty / File
                        </th>
                        <th className="p-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Type
                        </th>
                        <th className="p-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Orig
                        </th>
                        <th className="p-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Opt
                        </th>
                        <th className="p-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Quality
                        </th>
                        <th className="p-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Status
                        </th>
                        <th className="p-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Date
                        </th>
                        <th className="p-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {queue.map((item, idx) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/50 transition-colors"
                          data-ocid={`media.queue.row.${idx + 1}`}
                        >
                          <td className="p-3">
                            <Checkbox
                              checked={item.selected}
                              onCheckedChange={() => toggleSelect(item.id)}
                              data-ocid={`media.queue.checkbox.${idx + 1}`}
                            />
                          </td>
                          <td className="p-3">
                            <p className="font-medium text-slate-700 text-xs">
                              {item.aunty}
                            </p>
                            <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                              {item.fileName}
                            </p>
                          </td>
                          <td className="p-3">
                            <div
                              className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                                item.type === "Video"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {item.type === "Video" ? (
                                <Film className="w-3 h-3" />
                              ) : (
                                <ImageIcon className="w-3 h-3" />
                              )}
                              {item.type}
                            </div>
                          </td>
                          <td className="p-3 text-right text-xs text-slate-500">
                            {item.originalSize}
                          </td>
                          <td className="p-3 text-right text-xs font-semibold text-emerald-600">
                            {item.optimisedSize}
                          </td>
                          <td className="p-3">
                            <div className="flex flex-col items-center gap-1">
                              <span
                                className={`text-xs font-bold ${qualityColor(item.qualityScore).split(" ")[0]}`}
                              >
                                {item.qualityScore}
                              </span>
                              <QualityBar score={item.qualityScore} />
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusBadge(
                                item.status,
                              )}`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3 text-xs text-slate-500">
                            {item.date}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-end gap-1">
                              {item.status !== "Approved" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    queueAction(item.id, "approve")
                                  }
                                  className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors"
                                  title="Approve"
                                  data-ocid={`media.queue.confirm_button.${idx + 1}`}
                                >
                                  <ThumbsUp className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {item.status !== "Rejected" && (
                                <button
                                  type="button"
                                  onClick={() => queueAction(item.id, "reject")}
                                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                  title="Reject"
                                  data-ocid={`media.queue.delete_button.${idx + 1}`}
                                >
                                  <ThumbsDown className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() =>
                                  queueAction(item.id, "reprocess")
                                }
                                className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                                title="Re-process"
                                data-ocid={`media.queue.secondary_button.${idx + 1}`}
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                                title="Download"
                                data-ocid={`media.queue.button.${idx + 1}`}
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
