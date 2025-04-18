
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Bell, Clock, Moon, Volume2 } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast: uiToast } = useToast();

  // Settings state
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [meditationDuration, setMeditationDuration] = useState([10]);
  const [soundVolume, setSoundVolume] = useState([70]);
  const [bibleVersion, setBibleVersion] = useState("NIV");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleSaveSettings = () => {
    // This would save settings to a user profile in a real app
    toast("Settings Saved", {
      description: "Your preferences have been updated."
    });
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="opacity-90">Customize your experience</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-slate-900">Notifications</h3>
                <p className="text-sm text-slate-500">Receive daily meditation reminders</p>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Moon className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-slate-900">Dark Mode</h3>
                <p className="text-sm text-slate-500">Use dark theme for evening meditation</p>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-slate-900">Meditation Duration</h3>
                <p className="text-sm text-slate-500">Default session length: {meditationDuration[0]} minutes</p>
              </div>
            </div>
            <Slider 
              value={meditationDuration}
              onValueChange={setMeditationDuration}
              max={30}
              min={5}
              step={5}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Volume2 className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-slate-900">Background Sounds</h3>
                <p className="text-sm text-slate-500">Volume: {soundVolume[0]}%</p>
              </div>
            </div>
            <Slider 
              value={soundVolume}
              onValueChange={setSoundVolume}
              max={100}
              step={10}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-slate-900">Bible Version</h3>
                <p className="text-sm text-slate-500">Select your preferred translation</p>
              </div>
            </div>
            <Select value={bibleVersion} onValueChange={setBibleVersion}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Bible version" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NIV">New International Version (NIV)</SelectItem>
                <SelectItem value="ESV">English Standard Version (ESV)</SelectItem>
                <SelectItem value="KJV">King James Version (KJV)</SelectItem>
                <SelectItem value="NLT">New Living Translation (NLT)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleSaveSettings}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Save Settings
        </Button>

        <Button 
          variant="outline" 
          onClick={handleSignOut}
          className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
        >
          Sign Out
        </Button>
      </div>

      <Header />
    </div>
  );
};

export default Settings;
