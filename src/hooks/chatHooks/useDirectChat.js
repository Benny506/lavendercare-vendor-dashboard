// import supabase from '../../database/dbInit';
// import { useEffect, useRef, useState, useCallback } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// export function useDirectChat({ topic, meId, peerId }) {

//   const channelRef = useRef(null);
//   const insertSubRef = useRef(null);
//   const updateSubRef = useRef(null);
//   const msgsRef = useRef(null);

//   const [status, setStatus] = useState('connecting');
//   const [insertSubStatus, setInsertSubStatus] = useState('connecting')
//   const [updateSubStatus, setUpdateSubStatus] = useState('connecting')
//   const [messages, setMessages] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);

//   const sendMessage = useCallback(
//     async ({ text, toUser, bookingId }) => {
//       if (!text?.trim()) return;

//       const tempId = uuidv4();
//       const optimisticMessage = {
//         id: tempId,
//         from_user: meId,
//         to_user: toUser,
//         message: text.trim(),
//         created_at: new Date().toISOString(),
//         delivered_at: null,
//         read_at: null,
//         pending: true,
//         failed: false,
//       };

//       const realMessage = {
//         ...optimisticMessage,
//         booking_id: bookingId
//       }

//       delete realMessage.pending
//       delete realMessage.failed

//       // Optimistic UI update
//       setMessages((prev) => [...prev, optimisticMessage]);

//       let attempts = 0;
//       const maxAttempts = 2;
//       let inserted = false;

//       while (attempts < maxAttempts && !inserted) {
//         attempts++;
//         const { error } = await supabase.from('vendor_bookings_chats').insert(realMessage);
//         if (!error) inserted = true;

//         else{
//           console.log("ERROR ON COUNT", attempts, error)
//         }
//       }

//       if (!inserted) {
//         setMessages((prev) =>
//           prev.map((msg) =>
//             msg.id === tempId ? { ...msg, pending: false, failed: true } : msg
//           )
//         );

//       } else{
//         channelRef.current?.send({
//           type: 'broadcast',
//           event: 'sendMsg',
//           payload: realMessage
//         })        
//       }
//     },
//     [meId, topic]
//   );

//   // mark a message as delivered
//   const messageDelivered = async (messageId, read_at) => {
//     const { data, error } = await supabase
//       .from("vendor_bookings_chats")
//       .update({ delivered_at: new Date().toISOString() })
//       .eq("id", messageId)
//       .select('*')
//       .single();

//     if (error) {
//       console.error("msgDelivered error:", error);
//       return null;
//     }

//     const payload = {
//       ...data
//     }

//     if(read_at){
//       payload.read_at = read_at
//     }

//     channelRef.current?.send({
//       type: 'broadcast',
//       event: 'messageDelivered',
//       payload
//     })       

//     return payload; // updated message
//   }

//   // mark a message as read
//   const messageRead = async (messageId) => {
//     const { data, error } = await supabase
//       .from("vendor_bookings_chats")
//       .update({ read_at: new Date().toISOString() })
//       .eq("id", messageId)
//       .select()
//       .single();

//     if (error) {
//       console.error("msgRead error:", error);
//       return null;
//     }

//     channelRef.current?.send({
//       type: 'broadcast',
//       event: 'messageRead',
//       payload: data
//     })         

//     return data; // updated message
//   }

//   const onMsgReceived = (msg) => {
//     if(msg?.to_user === meId){

//         const msgId = msg?.id
//         const msgDelivered = messages.find(m => (m?.id == msgId) && m?.delivered_at)  

//         if(!msgDelivered){
//           messageDelivered(msg?.id, msg?.read_at)
//         }
//     }    
//   }  

//   const onMsgRead = (msg) => {
//     if(msg?.to_user === meId){

//       const msgId = msg?.id
//       const msgRead = messages.find(m => (m?.id == msgId) && m?.read_at)

//       if(!msgRead){
//         messageRead(msg?.id)
//       }
//     }
//   }  

//   const onMsgsLoaded = (by_id, timestamp) => {
//     if(by_id == meId && msgsRef.current?.length > 0) return 

//     console.log("Messages loaded by other user")

//     //all msgs sent to "by_id" that aren't read/delivered are now read/delivered at timestamp  

//     const updatedMsgs = [...msgsRef.current];

//     for (let i = 0; i < updatedMsgs.length; i++) {
//       const msg = updatedMsgs[i];
//       if (msg.to_user === by_id && (!msg.delivered_at || !msg.read_at)) {
//         updatedMsgs[i] = {
//           ...msg,
//           delivered_at: msg.delivered_at || timestamp,
//           read_at: msg.read_at || timestamp
//         };
//       }
//     }     

//     setMessages(dedupeMessages(updatedMsgs))
//   }

//   // helper: dedupe messages by id
//   const dedupeMessages = (msgs) => {
//     const seen = new Set();
//     return msgs.filter((msg) => {
//       if (seen.has(msg.id)) return false;
//       seen.add(msg.id);
//       return true;
//     });
//   };

//   const replaceOptimisticMessages = (msgs, newMsg) => {
//     const idx = msgs.findIndex((msg) => msg.id === newMsg.id);
//     if (idx !== -1) {
//       // Replace optimistic message
//       const updated = [...msgs];
//       updated[idx] = { ...newMsg, pending: false, failed: false };
//       return updated;
//     }

//     const replacedMsgs =  [...msgs, { ...newMsg, pending: false, failed: false }];    

//     return dedupeMessages(replacedMsgs)
//   }

//   const loadMessages = async ({ msgLoadedTimeStamp }) => {
//     const { data, error } = await supabase
//       .rpc('mark_vendor_messages_delivered_and_read', {
//         p_booking_id: topic,
//         p_user_id: meId,
//         p_timestamp: msgLoadedTimeStamp
//       });

//     if (!error) {
//       setMessages((prev) => dedupeMessages([...(prev || []), ...(data || [])]));     
//     }
//   };  

//   useEffect(() => {
//     msgsRef.current = messages
//   }, [messages])  

//   useEffect(() => {
//     if (!topic || !meId) return;

//     setStatus('connecting');
//     setInsertSubStatus('connecting');
//     setUpdateSubStatus('connecting')

//     const msgLoadedTimeStamp = new Date().toISOString()

//     loadMessages({ msgLoadedTimeStamp })

//     // Presence channel setup remains the same
//     const channel = supabase.channel(topic, {
//       config: { broadcast: { self: true, ack: true }, presence: { key: meId } },
//     });   

//     channel.on('broadcast', { event: 'sendMsg' }, (payload) => {
//       const msg = payload.payload

//       setMessages((prev) => replaceOptimisticMessages(prev || [], msg));

//       onMsgReceived(msg)
//     })    

//     channel.on('broadcast', { event: 'messageRead' }, (payload) => {
//       const msg = payload.payload

//       setMessages((prev) => replaceOptimisticMessages(prev || [], msg));
//     }) 

//     channel.on('broadcast', { event: 'messageDelivered' }, (payload) => {
//       const msg = payload.payload

//       setMessages((prev) => replaceOptimisticMessages(prev || [], msg));

//       onMsgRead(msg)
//     }) 

//     channel.on('broadcast', { event: 'messagesLoaded' }, (payload) => {
//       const { by_id, timestamp } = payload.payload

//       onMsgsLoaded(by_id, timestamp)
//     })      

//     // Presence event handlers (join, leave, sync) unchanged
//     channel.on('presence', { event: 'sync' }, () => {
//       const presenceState = channel.presenceState();
//       const users = Object.keys(presenceState).map((key) => key);
//       setOnlineUsers(users);
//     });
//     channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
//       setOnlineUsers((prev) => {
//         if (prev.includes(key)) return prev;
//         return [...prev, key];
//       });
//     });
//     channel.on('presence', { event: 'leave' }, ({ key }) => {
//       setOnlineUsers((prev) => prev.filter((u) => u !== key));
//     });

//     channel.subscribe(async (subStatus) => {
//       if (subStatus === 'SUBSCRIBED') {
//         setStatus('subscribed');

//         channel.send({
//           type: 'broadcast',
//           event: 'messagesLoaded',
//           payload: {
//             by_id: meId,
//             timestamp: msgLoadedTimeStamp
//           }
//         })         

//         await channel.track({ online_at: new Date().toISOString() }); 
//       } else if (subStatus === 'CLOSED' || subStatus === 'CHANNEL_ERROR') {
//         setStatus('error');
//       }
//     });

//     channelRef.current = channel;      

//     // New: Subscribe to realtime vendor_bookings_chats table changes filtered by booking_id
//     const insertSubscription = supabase
//       .channel('realtime-bookings-chats-insert')
//       .on(
//         'postgres_changes',
//         {
//           event: 'INSERT',
//           schema: 'public',
//           table: 'vendor_bookings_chats',
//           filter: `booking_id=eq.${topic}`,
//         },
//         (payload) => {
//           const newMsg = payload.new;
//           // console.log(newMsg)
//           setMessages((prev) => replaceOptimisticMessages(prev || [], newMsg));

//           onMsgReceived(newMsg)
//         }
//       )
//       .subscribe(status => {
//         console.log("Insert Real-Time status", status)
//         if(status === 'SUBSCRIBED'){
//           setInsertSubStatus('subscribed');
//           return
//         }

//         setInsertSubStatus('error');
//       });

//     const updateSubscription = supabase
//       .channel('realtime-bookings-chats-update')
//       .on(
//         'postgres_changes',
//         {
//           event: 'UPDATE',
//           schema: 'public',
//           table: 'vendor_bookings_chats',
//           filter: `booking_id=eq.${topic}`,
//         },
//         (payload) => {
//           const newMsg = payload.new;
//           // console.log(newMsg)
//           setMessages((prev) => replaceOptimisticMessages(prev || [], newMsg));

//           onMsgRead(newMsg)
//         }
//       )
//       .subscribe(status => {
//         console.log("Update Real-Time status", status)
//         if(status === 'SUBSCRIBED'){
//           setUpdateSubStatus('subscribed');
//           return
//         }

//         setUpdateSubStatus('error');
//       });      

//     insertSubRef.current = insertSubscription;
//     updateSubRef.current = updateSubscription;

//     return () => {
//       supabase.removeChannel(channel);
//       supabase.removeChannel(insertSubscription);
//       supabase.removeChannel(updateSubscription)
//       channelRef.current = null;
//       insertSubRef.current = null;
//       updateSubRef.current = null;
//       setMessages([]);
//       setOnlineUsers([]);
//     };
//   }, [topic, meId]);

//   return {
//     sendMessage,
//     messages,
//     status,
//     insertSubStatus,
//     updateSubStatus,
//     onlineUsers,
//   };
// }













import supabase from '../../database/dbInit';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { appLoadStart, appLoadStop } from '../../redux/slices/appLoadingSlice';
import { getMessages, setChannelIds } from '../../redux/slices/messagesSlice';
import { toast } from 'react-toastify';

export function useDirectChat({ topic, meId }) {

  const isAdmin = false
  const isVendor = true
  const isCommunity = false

  const dispatch = useDispatch()

  const channelRef = useRef(null);
  const insertSubRef = useRef(null);
  const updateSubRef = useRef(null);
  const msgsRef = useRef(null)

  const savedMsgs = useSelector(state => getMessages(state).channelIds[topic])

  const [status, setStatus] = useState('connecting');
  const [insertSubStatus, setInsertSubStatus] = useState('connecting')
  const [updateSubStatus, setUpdateSubStatus] = useState('connecting')
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [canLoadMoreMsgs, setCanLoadMoreMsgs] = useState(true)

  const tableName = isCommunity ? 'community_chat' : isAdmin ? 'admin_mothers_chat' : isVendor ? 'vendor_bookings_chats' : 'bookings_chats'
  const rpcName = isCommunity ? 'fetch_and_mark_community_chat_messages' : isAdmin ? 'mark_and_get_admin_mother_messages' : isVendor ? 'mark_vendor_messages_delivered_and_read' : 'fetch_and_mark_booking_chat_messages'

  const sendMessage = useCallback(
    async ({ text, toUser, bookingId, channel_id, community_id, user_profile }) => {

      try {

        if (!text?.trim()) return;

        const tempId = uuidv4();

        const optimisticMessage = {
          id: tempId,
          from_user: meId,
          message: text.trim(),
          created_at: new Date().toISOString(),
          delivered_at: null,
          read_at: null,
          pending: true,
          failed: false,
        };

        if (!isCommunity) {
          optimisticMessage.to_user = toUser
        }

        const realMessage = {
          ...optimisticMessage,
          [isCommunity ? 'community_id' : isAdmin ? 'channel_id' : 'booking_id']:
            isCommunity ? community_id : isAdmin ? channel_id : bookingId
        }

        delete realMessage.pending
        delete realMessage.failed

        // Optimistic UI update
        setMessages((prev) => [...prev, optimisticMessage]);
        // setMessages((prev) => [optimisticMessage, ...prev]);

        let attempts = 0;
        const maxAttempts = 2;
        let inserted = false;

        while (attempts < maxAttempts && !inserted) {
          attempts++;
          const { error } = await supabase.from(tableName).insert(realMessage);
          if (!error) inserted = true;

          else {
            console.log("ERROR ON COUNT", attempts, error)
          }
        }

        if (!inserted) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === tempId ? { ...msg, pending: false, failed: true } : msg
            )
          );

        } else {
          channelRef.current?.send({
            type: 'broadcast',
            event: 'sendMsg',
            payload: user_profile ? { ...realMessage, user_profile } : realMessage
          })
        }

      } catch (error) {
        console.log(error)
        toast.error('Error sending chat message')
      }
    },
    [meId, topic]
  );

  // mark a message as delivered
  const messageDelivered = async (messageId, read_at) => {
    const { data, error } = await supabase
      .from(tableName)
      .update({ delivered_at: new Date().toISOString() })
      .eq("id", messageId)
      .select()
      .single();

    if (error) {
      console.error("msgDelivered error:", error);
      return null;
    }

    const payload = {
      ...data
    }

    if (read_at) {
      payload.read_at = read_at
    }

    channelRef.current?.send({
      type: 'broadcast',
      event: 'messageDelivered',
      payload
    })

    return payload; // updated message
  }

  // mark a message as read
  const messageRead = async (messageId) => {
    const { data, error } = await supabase
      .from(tableName)
      .update({ read_at: new Date().toISOString() })
      .eq("id", messageId)
      .select()
      .single();

    if (error) {
      console.error("msgRead error:", error);
      return null;
    }

    channelRef.current?.send({
      type: 'broadcast',
      event: 'messageRead',
      payload: data
    })

    return data; // updated message
  }

  const bulkMsgsRead = async (msgsIds) => {

    const read_at = new Date().toISOString()

    const { data, error } = await supabase
      .from(tableName)
      .update({ read_at })
      .in("id", msgsIds)
      .select("id")

    if (error) {
      console.error("bulkMsgsRead error:", error);
      return null;
    }

    channelRef.current?.send({
      type: 'broadcast',
      event: 'bulkMsgsRead',
      payload: {
        msgsIds,
        read_at
      }
    })

    markMessagesRead(messages, msgsIds, read_at)

    return data; // updated messages
  }

  const onMsgReceived = (msg) => {
    if (msg?.to_user === meId) {

      const msgId = msg?.id
      const msgDelivered = messages.find(m => (m?.id == msgId) && m?.delivered_at)

      if (!msgDelivered) {
        messageDelivered(msg?.id, msg?.read_at)
      }
    }
  }

  const onMsgRead = (msg) => {
    if (msg?.to_user === meId) {

      const msgId = msg?.id
      const msgRead = messages.find(m => (m?.id == msgId) && m?.read_at)

      if (!msgRead) {
        messageRead(msg?.id)
      }
    }
  }

  const onMsgsLoaded = (by_id, timestamp) => {
    if (by_id == meId && msgsRef.current?.length > 0) return;

    console.log("Messages loaded by other user")

    //all msgs sent to "by_id" that aren't read/delivered are now read/delivered at timestamp  

    const updatedMsgs = [...msgsRef.current];

    for (let i = 0; i < updatedMsgs.length; i++) {
      const msg = updatedMsgs[i];
      if (msg.to_user === by_id && (!msg.delivered_at || !msg.read_at)) {
        updatedMsgs[i] = {
          ...msg,
          delivered_at: msg.delivered_at || timestamp,
          read_at: msg.read_at || timestamp
        };
      }
    }

    setMessages(dedupeMessages(updatedMsgs))
  }

  // helper: dedupe messages by id
  const dedupeMessages = (msgs) => {
    const seen = new Set();
    return msgs.filter((msg) => {
      if (seen.has(msg.id)) return false;
      seen.add(msg.id);
      return true;
    });
  };

  const replaceOptimisticMessages = (msgs, newMsg) => {
    const idx = msgs.findIndex((msg) => msg.id === newMsg.id);
    if (idx !== -1) {
      // Replace optimistic message
      const updated = [...msgs];
      updated[idx] = { ...newMsg, pending: false, failed: false };
      return updated;
    }

    const replacedMsgs = [...msgs, { ...newMsg, pending: false, failed: false }];
    // const replacedMsgs = [{ ...newMsg, pending: false, failed: false }, ...msgs];

    return dedupeMessages(replacedMsgs)
  }

  const markMessagesRead = (msgs, ids, readAt) => {
    if (!ids?.length) return msgs;

    const idSet = new Set(ids); // faster lookup

    return msgs.map(msg => {
      if (idSet.has(msg.id)) {
        return { ...msg, read_at: readAt };
      }
      return msg;
    });
  };

  const loadMessages = async ({ msgLoadedTimeStamp, last_loaded_at, isOlder }) => {

    if (savedMsgs && savedMsgs?.length > 0) {
      const lastSavedMsg = savedMsgs[savedMsgs?.length - 1]
      const lastSavedMsg_createdAt = lastSavedMsg?.created_at

      //no msg, first time loading!
      if (!last_loaded_at) {
        return afterMsgsLoaded(savedMsgs, { isOlder })
      }
    }

    // console.log("Loading msgs")

    const { data, error } = await supabase
      .rpc(rpcName, {
        [isCommunity ? 'c_id' : isAdmin ? 'ad_channel_id' : 'p_booking_id']: topic,
        [isCommunity ? 'c_user_id' : isAdmin ? 'ad_user_id' : 'p_user_id']: meId,
        [isCommunity ? 'c_timestamp' : isAdmin ? 'ad_timestamp' : 'p_timestamp']: msgLoadedTimeStamp,
        last_loaded_at,
        _limit: 5
      });

    if (!error) {
      if (data.length === 0) {
        setCanLoadMoreMsgs(false)
      }

      afterMsgsLoaded(data, { isOlder })
      return
    }

    console.log(error)
  };
  const afterMsgsLoaded = (_msgs, { isOlder = false } = {}) => {
    const msgs = [..._msgs].reverse(); // normalize to ASC

    setMessages((prev) =>
      dedupeMessages(
        isOlder
          ? [...msgs, ...(prev || [])] // prepend if fetching older
          : [...(prev || []), ...msgs] // append if fetching newer
      )
    );
  };


  const setup = useCallback(({ topic, meId, tableName, isAdmin, msgLoadedTimeStamp }) => {
    // Presence + broadcast channel

    if (channelRef.current) supabase.removeChannel(channelRef.current);
    if (insertSubRef.current) supabase.removeChannel(insertSubRef.current);
    if (updateSubRef.current) supabase.removeChannel(updateSubRef.current);

    const channel = supabase.channel(topic, {
      config: { broadcast: { self: true, ack: true }, presence: { key: meId } },
    });

    channel.on('broadcast', { event: 'sendMsg' }, (payload) => {
      const msg = payload.payload
      setMessages((prev) => replaceOptimisticMessages(prev || [], msg));
      onMsgReceived(msg)
    })

    channel.on('broadcast', { event: 'messageRead' }, (payload) => {
      const msg = payload.payload
      setMessages((prev) => replaceOptimisticMessages(prev || [], msg));
    })

    channel.on('broadcast', { event: 'bulkMsgsRead' }, (payload) => {
      const msgsIds = payload.payload?.msgsIds
      const read_at = payload.payload?.read_at
      setMessages((prev) => markMessagesRead(prev || [], msgsIds, read_at));
    })

    channel.on('broadcast', { event: 'messageDelivered' }, (payload) => {
      const msg = payload.payload
      setMessages((prev) => replaceOptimisticMessages(prev || [], msg));
      if (!isAdmin && !isCommunity) {
        onMsgRead(msg)
      }
    })

    channel.on('broadcast', { event: 'messagesLoaded' }, (payload) => {
      const { by_id, timestamp } = payload.payload
      onMsgsLoaded(by_id, timestamp)
    })

    channel.on('presence', { event: 'sync' }, () => {
      const presenceState = channel.presenceState();
      const users = Object.keys(presenceState).map((key) => key);
      setOnlineUsers(users);
    });
    channel.on('presence', { event: 'join' }, ({ key }) => {
      setOnlineUsers((prev) => {
        if (prev.includes(key)) return prev;
        return [...prev, key];
      });
    });
    channel.on('presence', { event: 'leave' }, ({ key }) => {
      setOnlineUsers((prev) => prev.filter((u) => u !== key));
    });

    channel.subscribe(async (subStatus) => {
      if (subStatus === 'SUBSCRIBED') {
        setStatus('subscribed');
        channel.send({
          type: 'broadcast',
          event: 'messagesLoaded',
          payload: {
            by_id: meId,
            timestamp: msgLoadedTimeStamp
          }
        })
        await channel.track({ online_at: new Date().toISOString() });
      } else if (subStatus === 'CLOSED' || subStatus === 'CHANNEL_ERROR') {
        setStatus('error');
        // retry after delay
        // setTimeout(() => {
        //   supabase.removeChannel(channel);
        //   setup();
        // }, 2000);
      }
    });

    channelRef.current = channel;

    // Insert subscription
    const insertSubscription = supabase
      .channel('realtime-bookings-chats')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: tableName,
          filter: isCommunity ? `community_id=eq.${topic}` : isAdmin ? `channel_id=eq.${topic}` : `booking_id=eq.${topic}`,
        },
        (payload) => {
          const newMsg = payload.new;
          setMessages((prev) => replaceOptimisticMessages(prev || [], newMsg));
          onMsgReceived(newMsg)
        }
      )
      .subscribe(status => {
        if (status === 'SUBSCRIBED') {
          setInsertSubStatus('subscribed');
          return
        }
        if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          setInsertSubStatus('error');
          // setTimeout(() => {
          //   supabase.removeChannel(insertSubscription);
          //   setup();
          // }, 2000);
        } else {
          setInsertSubStatus('error');
        }
      });

    // Update subscription
    const updateSubscription = supabase
      .channel('realtime-bookings-chats-update')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: tableName,
          filter: isCommunity ? `community_id=eq.${topic}` : isAdmin ? `channel_id=eq.${topic}` : `booking_id=eq.${topic}`,
        },
        (payload) => {
          const newMsg = payload.new;
          setMessages((prev) => replaceOptimisticMessages(prev || [], newMsg));
          if (!isAdmin && !isCommunity) {
            onMsgRead(newMsg)
          }
        }
      )
      .subscribe(status => {
        console.log("Update Real-Time status", status)
        if (status === 'SUBSCRIBED') {
          setUpdateSubStatus('subscribed');
          return
        }
        if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          setUpdateSubStatus('error');
          // setTimeout(() => {
          //   supabase.removeChannel(updateSubscription);
          //   setup();
          // }, 2000);
        } else {
          setUpdateSubStatus('error');
        }
      });

    insertSubRef.current = insertSubscription;
    updateSubRef.current = updateSubscription
  }, [])

  const refreshConnection = () => {
    dispatch(appLoadStart())

    const msgLoadedTimeStamp = new Date().toISOString()

    setup({ topic, meId, tableName, isAdmin, msgLoadedTimeStamp });

    const timer = setTimeout(() => {
      dispatch(appLoadStop())
      clearTimeout(timer)
    }, 3000)
  };

  useEffect(() => {
    const reversed = [...messages]?.reverse()
    msgsRef.current = reversed

    const channelId = topic
    dispatch(setChannelIds({
      channelId,
      messages: reversed
    }))
  }, [messages])

  useEffect(() => {
    if (!topic || !meId) return;

    setStatus('connecting');
    setInsertSubStatus('connecting');
    setUpdateSubStatus('connecting')

    const msgLoadedTimeStamp = new Date().toISOString()

    loadMessages({ msgLoadedTimeStamp })

    setup({ topic, meId, tableName, isAdmin, msgLoadedTimeStamp });

    return () => {
      cleanup()
    };
  }, [topic, meId]);

  const cleanup = () => {
    if (channelRef.current) supabase.removeChannel(channelRef.current);
    if (insertSubRef.current) supabase.removeChannel(insertSubRef.current);
    if (updateSubRef.current) supabase.removeChannel(updateSubRef.current);
    channelRef.current = null;
    insertSubRef.current = null;
    updateSubRef.current = null;
    setMessages([]);
    setOnlineUsers([]);
  };



  return {
    sendMessage,
    messages,
    status,
    insertSubStatus,
    updateSubStatus,
    onlineUsers,
    onMsgRead,
    bulkMsgsRead,
    refreshConnection,
    cleanup,
    loadMessages,
    canLoadMoreMsgs
  };
}
