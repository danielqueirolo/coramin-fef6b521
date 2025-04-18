
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Moon, Globe, Clock, Lock, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Settings state
  const [darkMode, setDarkMode] = useState(false);
  const [meditationDuration, setMeditationDuration] = useState([10]);
  const [language, setLanguage] = useState("pt");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleSaveSettings = () => {
    toast("Configurações salvas", {
      description: "Suas preferências foram atualizadas."
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast("Erro", {
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would implement the password change logic
    toast("Senha alterada", {
      description: "Sua senha foi atualizada com sucesso."
    });
  };

  const handleDeleteAccount = async () => {
    // Here you would implement the account deletion logic
    await signOut();
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-divine-600 text-white p-6">
        <h1 className="text-2xl font-semibold">Configurações</h1>
        <p className="opacity-90">Personalize sua experiência</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Moon className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-slate-900">Modo Escuro</h3>
                <p className="text-sm text-slate-500">Ative o tema escuro para meditação noturna</p>
              </div>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-slate-900">Duração da Meditação</h3>
                <p className="text-sm text-slate-500">{meditationDuration[0]} minutos</p>
              </div>
            </div>
            <Slider 
              value={meditationDuration}
              onValueChange={setMeditationDuration}
              max={30}
              min={1}
              step={1}
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-slate-900">Idioma</h3>
                <p className="text-sm text-slate-500">Escolha o idioma do aplicativo</p>
              </div>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-slate-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-slate-900">Alterar Senha</h3>
                <p className="text-sm text-slate-500">Atualize sua senha de acesso</p>
              </div>
            </div>
            <div className="space-y-3">
              <Input
                type="password"
                placeholder="Senha atual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button 
                onClick={handleChangePassword}
                className="w-full"
                variant="outline"
              >
                Alterar Senha
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => window.open("/privacy-policy", "_blank")}
            >
              Política de Privacidade
            </Button>
          </div>

          <Separator />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                className="w-full flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Excluir Conta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Excluir conta
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta
                  e removerá seus dados de nossos servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteAccount}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Sim, excluir minha conta
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Button 
          onClick={handleSaveSettings}
          className="w-full bg-divine-600 hover:bg-divine-700"
        >
          Salvar Configurações
        </Button>
      </div>

      <Header />
    </div>
  );
};

export default Settings;
