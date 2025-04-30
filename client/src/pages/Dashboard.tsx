import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600 mt-2">Welcome to your dashboard overview</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,249</div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span className="material-icons text-green-500 text-sm mr-1">trending_up</span>
                  <span>+5.2% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Active Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">312</div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span className="material-icons text-green-500 text-sm mr-1">trending_up</span>
                  <span>+12% from last hour</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Server Load</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28%</div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span className="material-icons text-green-500 text-sm mr-1">trending_down</span>
                  <span>-3% from average</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Error Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.12%</div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span className="material-icons text-green-500 text-sm mr-1">trending_down</span>
                  <span>-0.4% from yesterday</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-start space-x-4 pb-4 border-b border-neutral-200 last:border-0">
                      <div className="rounded-full bg-primary text-white p-2 flex items-center justify-center">
                        <span className="material-icons text-sm">notifications</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">System notification {item}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">5 minutes ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Analytics data will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Reports data will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Settings options will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
