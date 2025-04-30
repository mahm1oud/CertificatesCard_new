import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, Info, Database, FileText, Settings, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Step interface
interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Component for requirements check
const RequirementsCheck = ({ onComplete }: { onComplete: (passed: boolean) => void }) => {
  const [checks, setChecks] = useState({
    php: { passed: false, message: "جاري التحقق..." },
    database: { passed: false, message: "جاري التحقق..." },
    writable: { passed: false, message: "جاري التحقق..." },
    extensions: { passed: false, message: "جاري التحقق..." },
    node: { passed: false, message: "جاري التحقق..." },
  });
  const [loading, setLoading] = useState(true);
  const [allPassed, setAllPassed] = useState(false);

  useEffect(() => {
    const checkRequirements = async () => {
      try {
        const response = await apiRequest("/api/installer/check-requirements", {
          method: "GET"
        });
        
        if (response) {
          setChecks(response);
          
          // Check if all requirements passed
          const allRequirementsPassed = Object.values(response).every(check => check.passed);
          setAllPassed(allRequirementsPassed);
          onComplete(allRequirementsPassed);
        }
      } catch (error) {
        console.error("Error checking requirements:", error);
      } finally {
        setLoading(false);
      }
    };

    checkRequirements();
  }, [onComplete]);

  return (
    <div className="space-y-4">
      <Alert variant={allPassed ? "default" : "destructive"}>
        <Info className="h-4 w-4" />
        <AlertTitle>متطلبات النظام</AlertTitle>
        <AlertDescription>
          يجب استيفاء جميع المتطلبات التالية لتثبيت النظام بنجاح.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(checks).map(([key, check]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {check.passed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span>{check.message}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button 
            onClick={() => onComplete(allPassed)} 
            disabled={loading || !allPassed}
            className="w-full"
          >
            {loading ? "جاري التحقق..." : allPassed ? "متابعة" : "يرجى استيفاء جميع المتطلبات"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Component for database setup
const DatabaseSetup = ({ onComplete }: { onComplete: (success: boolean) => void }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    host: "localhost",
    port: "5432",
    database: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiRequest("POST", "/api/installer/setup-database", formData);

      if (response && response.success) {
        toast({
          title: "نجاح!",
          description: "تم إعداد قاعدة البيانات بنجاح.",
          variant: "default",
        });
        onComplete(true);
      } else {
        toast({
          title: "خطأ",
          description: response?.message || "فشل إعداد قاعدة البيانات.",
          variant: "destructive",
        });
        onComplete(false);
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل إعداد قاعدة البيانات. يرجى التحقق من المعلومات المدخلة.",
        variant: "destructive",
      });
      onComplete(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>إعداد قاعدة البيانات</CardTitle>
          <CardDescription>أدخل معلومات قاعدة البيانات الخاصة بك</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="host">مضيف قاعدة البيانات</Label>
              <Input
                id="host"
                name="host"
                value={formData.host}
                onChange={handleChange}
                placeholder="localhost"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">منفذ قاعدة البيانات</Label>
              <Input
                id="port"
                name="port"
                value={formData.port}
                onChange={handleChange}
                placeholder="5432"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="database">اسم قاعدة البيانات</Label>
            <Input
              id="database"
              name="database"
              value={formData.database}
              onChange={handleChange}
              placeholder="cards_db"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">اسم مستخدم قاعدة البيانات</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="postgres"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">كلمة مرور قاعدة البيانات</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "جاري الاتصال..." : "اختبار الاتصال وإعداد قاعدة البيانات"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

// Component for admin setup
const AdminSetup = ({ onComplete }: { onComplete: (success: boolean) => void }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "admin",
    password: "",
    confirmPassword: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمات المرور غير متطابقة.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const response = await apiRequest("/api/installer/setup-admin", {
        method: "POST",
        data: {
          name: formData.name,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        },
      });

      if (response.success) {
        toast({
          title: "نجاح!",
          description: "تم إنشاء حساب المدير بنجاح.",
          variant: "default",
        });
        onComplete(true);
      } else {
        toast({
          title: "خطأ",
          description: response.message || "فشل إنشاء حساب المدير.",
          variant: "destructive",
        });
        onComplete(false);
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل إنشاء حساب المدير. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
      onComplete(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>إعداد حساب المدير</CardTitle>
          <CardDescription>أنشئ حساب المدير الرئيسي للنظام</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">الاسم</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="الاسم الكامل"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">اسم المستخدم</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="admin"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "جاري الإنشاء..." : "إنشاء حساب المدير"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

// Component for site settings
const SiteSetup = ({ onComplete }: { onComplete: (success: boolean) => void }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    siteName: "بطاقة",
    siteDescription: "نظام إنشاء البطاقات والشهادات الاحترافية",
    siteUrl: "",
    companyName: "",
    contactEmail: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiRequest("/api/installer/setup-site", {
        method: "POST",
        data: formData,
      });

      if (response.success) {
        toast({
          title: "نجاح!",
          description: "تم إعداد معلومات الموقع بنجاح.",
          variant: "default",
        });
        onComplete(true);
      } else {
        toast({
          title: "خطأ",
          description: response.message || "فشل إعداد معلومات الموقع.",
          variant: "destructive",
        });
        onComplete(false);
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل إعداد معلومات الموقع. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
      onComplete(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات الموقع</CardTitle>
          <CardDescription>أدخل المعلومات الأساسية للموقع</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">اسم الموقع</Label>
            <Input
              id="siteName"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              placeholder="بطاقة"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription">وصف الموقع</Label>
            <Input
              id="siteDescription"
              name="siteDescription"
              value={formData.siteDescription}
              onChange={handleChange}
              placeholder="نظام إنشاء البطاقات والشهادات الاحترافية"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteUrl">رابط الموقع</Label>
            <Input
              id="siteUrl"
              name="siteUrl"
              value={formData.siteUrl}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">اسم الشركة</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="اسم شركتك (اختياري)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">البريد الإلكتروني للتواصل</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="contact@example.com"
            />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "جاري الحفظ..." : "حفظ إعدادات الموقع"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

// Component for final completion
const CompletionStep = () => {
  const handleGoToLogin = () => {
    window.location.href = "/auth";
  };

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">تهانينا! 🎉</CardTitle>
        <CardDescription className="text-center">
          تم تثبيت النظام بنجاح ويمكنك الآن البدء باستخدامه.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="py-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <p className="text-lg">
            تم إعداد جميع المكونات المطلوبة وإنشاء قاعدة البيانات ويمكنك الآن تسجيل الدخول باستخدام معلومات المدير التي قمت بإدخالها.
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 flex justify-center">
        <Button onClick={handleGoToLogin} className="px-6">
          انتقل إلى صفحة تسجيل الدخول
        </Button>
      </CardFooter>
    </Card>
  );
};

// Main installer component
export default function InstallerPage() {
  // Define installation steps
  const steps: Step[] = [
    {
      id: "requirements",
      title: "متطلبات النظام",
      description: "التحقق من توافق النظام",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      id: "database",
      title: "قاعدة البيانات",
      description: "إعداد قاعدة البيانات",
      icon: <Database className="h-6 w-6" />,
    },
    {
      id: "admin",
      title: "حساب المدير",
      description: "إنشاء حساب المدير",
      icon: <User className="h-6 w-6" />,
    },
    {
      id: "site",
      title: "إعدادات الموقع",
      description: "تكوين إعدادات الموقع",
      icon: <Settings className="h-6 w-6" />,
    },
    {
      id: "complete",
      title: "اكتمال",
      description: "إنهاء التثبيت",
      icon: <CheckCircle className="h-6 w-6" />,
    },
  ];

  const [currentStep, setCurrentStep] = useState("requirements");
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [isInstalled, setIsInstalled] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkInstallation = useCallback(async () => {
    try {
      const response = await apiRequest("/api/installer/status");
      setIsInstalled(response.installed);
    } catch (error) {
      console.error("Failed to check installation status:", error);
      setIsInstalled(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkInstallation();
  }, [checkInstallation]);

  const handleStepCompletion = (stepId: string, success: boolean) => {
    if (success) {
      setCompletedSteps(prev => ({ ...prev, [stepId]: true }));
      
      // Move to next step
      const currentIndex = steps.findIndex(step => step.id === stepId);
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1].id);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isInstalled) {
    return (
      <div className="container max-w-3xl mx-auto py-12 px-4">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">النظام مثبت بالفعل</CardTitle>
            <CardDescription>
              تم تثبيت النظام بالفعل ويمكنك استخدامه الآن.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-lg mb-4">
              لقد تم تثبيت النظام بنجاح مسبقًا. إذا كنت ترغب في إعادة التثبيت، يرجى حذف ملف التثبيت أو الاتصال بالمسؤول.
            </p>
          </CardContent>
          <CardFooter className="border-t px-6 py-4 flex justify-center">
            <Button onClick={() => window.location.href = "/"} className="px-6">
              العودة إلى الصفحة الرئيسية
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">تثبيت نظام بطاقة</h1>
        <p className="text-muted-foreground">
          مرحبًا بك في معالج تثبيت نظام إنشاء البطاقات والشهادات. اتبع الخطوات التالية لإكمال التثبيت.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {steps.map((step, index) => {
          const isCompleted = completedSteps[step.id];
          const isCurrent = currentStep === step.id;
          
          return (
            <div 
              key={step.id}
              className={`relative ${
                isCompleted ? "text-green-500" : isCurrent ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="flex items-center mb-2">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full border
                  ${isCompleted ? "bg-green-500 border-green-500 text-white" : 
                    isCurrent ? "bg-primary border-primary text-white" : 
                    "bg-background border-muted-foreground text-muted-foreground"}
                `}>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className="mr-2 font-medium">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute top-4 left-4 w-[calc(100%-2rem)] h-[1px] bg-muted-foreground/20"></div>
              )}
            </div>
          );
        })}
      </div>
      
      <Separator className="my-8" />

      <div className="max-w-3xl mx-auto">
        {currentStep === "requirements" && (
          <RequirementsCheck onComplete={(passed) => handleStepCompletion("requirements", passed)} />
        )}
        
        {currentStep === "database" && (
          <DatabaseSetup onComplete={(success) => handleStepCompletion("database", success)} />
        )}
        
        {currentStep === "admin" && (
          <AdminSetup onComplete={(success) => handleStepCompletion("admin", success)} />
        )}
        
        {currentStep === "site" && (
          <SiteSetup onComplete={(success) => handleStepCompletion("site", success)} />
        )}
        
        {currentStep === "complete" && <CompletionStep />}
      </div>
    </div>
  );
}