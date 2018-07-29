using Owin;
using Microsoft.Owin;
[assembly: OwinStartup(typeof(WebScket.Startup))]

namespace WebScket
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR();

            var master = new WebScket.Hubs.ChatMasterEventHandler();

            System.Threading.Tasks.Task.Run(() =>
            {
                var loop = 0;
                while (loop < 5)
                {
                    loop++;

                    System.Threading.Thread.Sleep(5000);
                    master.Handle();
                }
            });
            
        }
    }
}