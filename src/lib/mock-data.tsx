// Generate mock data for the dashboard
export const generateMockData = () => {
    // Mock data for visitor counts over time
    const dailyVisitors = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - 29 + i);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
      
      // Generate a somewhat realistic pattern with weekends having lower traffic
      const day = date.getDay(); // 0 is Sunday, 6 is Saturday
      const isWeekend = day === 0 || day === 6;
      
      const baseLine = 150 + Math.random() * 50;
      const randomVariation = Math.random() * 100 - 50;
      const weekendFactor = isWeekend ? 0.7 : 1;
      
      return {
        name: formattedDate,
        visitors: Math.floor((baseLine + randomVariation) * weekendFactor),
        pageviews: Math.floor((baseLine + randomVariation) * weekendFactor * (1.5 + Math.random())),
      };
    });
  
    // Mock data for page metrics
    const topPages = [
      { name: '/home', visitors: 1250, avgTimeOnPage: '2:10' },
      { name: '/products', visitors: 987, avgTimeOnPage: '3:45' },
      { name: '/blog', visitors: 864, avgTimeOnPage: '4:23' },
      { name: '/contact', visitors: 653, avgTimeOnPage: '1:15' },
      { name: '/about', visitors: 541, avgTimeOnPage: '1:50' },
    ];
  
    // Mock data for traffic sources
    const trafficSources = [
      { name: 'Organic Search', visitors: 2150, percentage: 38 },
      { name: 'Direct', visitors: 1540, percentage: 27 },
      { name: 'Social Media', visitors: 980, percentage: 17 },
      { name: 'Referral', visitors: 650, percentage: 11 },
      { name: 'Paid Search', visitors: 420, percentage: 7 },
    ];
  
    // Mock data for devices
    const devicesData = [
      { name: 'Desktop', value: 55 },
      { name: 'Mobile', value: 38 },
      { name: 'Tablet', value: 7 },
    ];
  
    // Mock data for user behavior
    const bounceRate = 45.8;
    const avgSessionDuration = '2:35';
    const pagesPerSession = 3.2;
  
    // Overview stats
    const totalVisitors = dailyVisitors.reduce((sum, item) => sum + item.visitors, 0);
    const totalPageviews = dailyVisitors.reduce((sum, item) => sum + item.pageviews, 0);
    
    // Bounce rate change
    const prevBounceRate = bounceRate + (Math.random() * 10 - 5);
    const bounceRateChange = ((bounceRate - prevBounceRate) / prevBounceRate) * 100;
  
    // Visitor change
    const prevVisitors = totalVisitors * (0.9 + Math.random() * 0.2);
    const visitorChange = ((totalVisitors - prevVisitors) / prevVisitors) * 100;
  
    // Events data
    const eventsData = [
      { name: 'Button Click', count: 3245 },
      { name: 'Form Submit', count: 1876 },
      { name: 'Download', count: 954 },
      { name: 'Video Play', count: 2134 },
      { name: 'Purchase', count: 567 },
    ];
    
    // Conversion data for PostHog
    const funnelSteps = [
      { name: 'Visit', count: 5000, rate: 100 },
      { name: 'Sign Up', count: 1500, rate: 30 },
      { name: 'Product View', count: 1200, rate: 24 },
      { name: 'Add to Cart', count: 800, rate: 16 },
      { name: 'Purchase', count: 500, rate: 10 },
    ];
  
    return {
      dailyVisitors,
      topPages,
      trafficSources,
      devicesData,
      bounceRate,
      avgSessionDuration,
      pagesPerSession,
      totalVisitors,
      totalPageviews,
      bounceRateChange,
      visitorChange,
      eventsData,
      funnelSteps
    };
  };
  