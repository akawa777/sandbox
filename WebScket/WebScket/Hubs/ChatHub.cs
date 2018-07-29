using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace WebScket.Hubs
{
    public class ChatHub : Hub
    {        
        public void Send(string className, MessageDto messageDto)
        {
            var app = new ChatApp();
            app.Send(messageDto);
            // Call the addNewMessageToPage method to update clients.
            //Clients.All.addNewMessageToPage(messageDto);            
        }
    }

    public interface INotifyHub
    {
        List<string> UserIds { get; }
        object Value { get; set;  }
        IPorts Ports { get; }
        void Send();
    }

    public class NotifyHub : INotifyHub
    {
        public List<string> UserIds { get; } = new List<string>();
        public object Value { get; set; }
        public IPorts Ports { get; } = new Ports();

        public void Send()
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<ChatHub>();
            hubContext.Clients.All.Recive(Value);
        }
    }

    public interface IPorts
    {
        void Add<T>(Expression<Func<T, NotifyArraival>> action);
    }

    public class Ports : IPorts
    {        
        public void Add<T>(Expression<Func<T, NotifyArraival>> action)
        {
            
        }
    }

    public class MessageDto
    {
        public string name { get; set; }
        public string message { get; set; }
        
    }

    public class NotifyArraival
    {
        private NotifyArraival()
        {

        }

        public static NotifyArraival Standby()
        {
            throw new InvalidOperationException("Use only clients.");
        }
    }


    public class ChatApp
    {
        public ChatApp()
        {
            _notifyHub = new NotifyHub();
        }

        private INotifyHub _notifyHub;

        public void Send(MessageDto messageDto)
        {
            _notifyHub.UserIds.AddRange(new string[]{ "admin", "user1" });
            _notifyHub.Value = messageDto;
            _notifyHub.Ports.Add<ChatApp>(x => x.Recive(default(MessageDto)));
            _notifyHub.Send();
        }

        public NotifyArraival Recive(MessageDto dto) => NotifyArraival.Standby();
    }

    public class ChatMasterEventHandler
    {
        public ChatMasterEventHandler()
        {
            _notifyHub = new NotifyHub();
        }

        private INotifyHub _notifyHub;

        public void Handle()
        {
            var dto = new MessageDto
            {
                name = "master",
                message = "i am master"
            };

            _notifyHub.UserIds.AddRange(new string[] { "admin", "user1" });
            _notifyHub.Value = dto;
            _notifyHub.Ports.Add<ChatApp>(x => x.Recive(default(MessageDto)));
            _notifyHub.Send();
        }
    }
}