import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Monitor, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-5 max-w-xl" data-ocid="settings.page">
      <Card className="shadow-xs border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display text-[15px]">
            <Settings className="w-4 h-4 text-[#003E8A]" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Theme */}
          <div className="space-y-2" data-ocid="settings.theme.row">
            <Label className="font-medium text-sm">Appearance</Label>
            <p className="text-xs text-muted-foreground">
              Choose your preferred color scheme
            </p>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                data-ocid="settings.theme.light.button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors flex-1 justify-center ${theme === "light" ? "bg-[#003E8A] text-white border-[#003E8A]" : "border-border text-muted-foreground hover:bg-muted"}`}
              >
                <Sun className="w-4 h-4" /> Light
              </button>
              <button
                type="button"
                data-ocid="settings.theme.dark.button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors flex-1 justify-center ${theme === "dark" ? "bg-[#003E8A] text-white border-[#003E8A]" : "border-border text-muted-foreground hover:bg-muted"}`}
              >
                <Moon className="w-4 h-4" /> Dark
              </button>
              <button
                type="button"
                data-ocid="settings.theme.system.button"
                onClick={() => setTheme("system")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors flex-1 justify-center ${theme === "system" ? "bg-[#003E8A] text-white border-[#003E8A]" : "border-border text-muted-foreground hover:bg-muted"}`}
              >
                <Monitor className="w-4 h-4" /> System
              </button>
            </div>
          </div>
          <Separator />

          <div
            className="flex items-center justify-between py-1"
            data-ocid="settings.notifications.row"
          >
            <div>
              <Label className="font-medium text-sm">Match Notifications</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Show alerts when match status changes
              </p>
            </div>
            <Switch data-ocid="settings.notifications.switch" defaultChecked />
          </div>
          <Separator />
          <div
            className="flex items-center justify-between py-1"
            data-ocid="settings.autosave.row"
          >
            <div>
              <Label className="font-medium text-sm">Auto-save Scores</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Automatically save score updates
              </p>
            </div>
            <Switch data-ocid="settings.autosave.switch" defaultChecked />
          </div>
          <Separator />
          <div
            className="flex items-center justify-between py-1"
            data-ocid="settings.sound.row"
          >
            <div>
              <Label className="font-medium text-sm">Sound Effects</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Play sound when score is updated
              </p>
            </div>
            <Switch data-ocid="settings.sound.switch" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xs border-border">
        <CardHeader>
          <CardTitle className="font-display text-[15px]">
            About DSSPL
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Dev Sanskriti School Premier League — Annual Inter-Dal Sports
            Tournament.
          </p>
          <p className="font-medium text-foreground">Version 1.0.0</p>
          <p>
            © {new Date().getFullYear()} DSSPL.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "dsspl")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#003E8A] hover:underline"
            >
              Built with caffeine.ai
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
