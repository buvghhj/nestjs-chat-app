import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useGetChat } from '../../hooks/useGetChat'
import { Avatar, Box, Divider, Grid, IconButton, InputBase, Paper, Stack, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useCreateMessage } from '../../hooks/useCreateMessage'
import { useGetMessages } from '../../hooks/useGetMessages'
import { useMessageCreated } from '../../hooks/useMessageCreated'
import { useGetMe } from '../../hooks/useGetMe'
import { PAGE_SIZE } from '../../constants/page-size'
import { useCountMessages } from '../../hooks/useCountMessages'
import InfiniteScroll from 'react-infinite-scroller'

export interface Message {
    _id: string;
    content: string;
    createdAt: Date;
    chatId: string;
    user: {
        _id: string;
        username: string;
        email: string;
    }
    __typename?: "Messages";
}

const Chat = () => {

    const { data: user } = useGetMe()

    const params = useParams()

    const [message, setMessage] = useState("")

    const chatId = params._id!

    const { data } = useGetChat({ _id: chatId })

    const [createMessage] = useCreateMessage()

    const { data: messages, fetchMore } = useGetMessages({
        chatId,
        skip: 0,
        limit: PAGE_SIZE,
    })

    const divRef = useRef<HTMLDivElement | null>(null)

    const location = useLocation()

    const { messagesCount, countMessages } = useCountMessages(chatId)

    useEffect(() => {

        countMessages()

    }, [countMessages])

    const scrollToBottom = () => divRef.current?.scrollIntoView()

    useEffect(() => {

        if (messages?.messages && messages.messages.length <= PAGE_SIZE) {

            setMessage("")

            scrollToBottom()

        }

    }, [location.pathname, messages])

    const handleSendMessage = async () => {

        await createMessage({

            variables: { createMessageInput: { content: message, chatId } }

        })

        setMessage("")

        scrollToBottom()

    }

    return (

        <>
            <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
                <h1>{data?.chat.name}</h1>

                <Box sx={{ maxHeight: '70vh', overflow: 'auto' }}>

                    <InfiniteScroll
                        pageStart={0}
                        isReverse={true}
                        loadMore={() => fetchMore({ variables: { skip: messages?.messages.length || 0 } })}
                        hasMore={
                            messages && messagesCount ? (messages?.messages?.length || 0) < messagesCount : false
                        }
                        useWindow={false}
                    >

                        {messages &&
                            [...messages.messages]
                                .sort(
                                    (messageA, messageB) =>
                                        new Date(messageA.createdAt).getTime() - new Date(messageB.createdAt).getTime()
                                )
                                .map((message) => {
                                    const isCurrentUser = message.user._id === user?.me._id;
                                    return (
                                        <Grid
                                            container
                                            alignItems={'center'}
                                            marginBottom={'1rem'}
                                            justifyContent={isCurrentUser ? 'flex-end' : 'flex-start'}
                                            key={message._id}
                                        >
                                            {!isCurrentUser && (
                                                <Grid >
                                                    <Avatar src='' style={{ marginBottom: '2.1rem' }} sx={{ width: 52, height: 52 }} />
                                                </Grid>
                                            )}

                                            <Grid item xs={10} md={11} display="flex" justifyContent={isCurrentUser ? 'flex-end' : 'flex-start'}>
                                                <Stack>
                                                    <Paper
                                                        sx={{
                                                            width: 'fit-content',
                                                            backgroundColor: isCurrentUser ? '#2196F3' : '#000',
                                                            color: '#fff',
                                                            padding: '0.9rem',
                                                            borderRadius: '10px',
                                                            marginRight: isCurrentUser ? '20px' : '0',
                                                            marginLeft: !isCurrentUser ? '20px' : '0',
                                                        }}

                                                    >
                                                        <Typography>{message.content}</Typography>
                                                    </Paper>
                                                    <Typography variant='caption' sx={{ marginLeft: !isCurrentUser ? '1.4rem' : '0', marginRight: isCurrentUser ? '3rem' : '0', }}>
                                                        <p style={{ fontSize: '10px' }}>
                                                            {new Date(message.createdAt).toLocaleTimeString()} -{" "}
                                                            {new Date(message.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                        <div ref={divRef}></div>

                    </InfiniteScroll>

                </Box>

                <Paper
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        justifySelf: 'flex-end',
                        alignItems: 'center',
                        width: '100%',
                        margin: '1rem 0',
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1, width: '100%' }}
                        placeholder='Message'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        onKeyDown={async (e) => {
                            if (e.key === 'Enter') {
                                await handleSendMessage();
                            }
                        }}
                    />

                    <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />

                    <IconButton onClick={handleSendMessage} color='primary' sx={{ p: '10px' }}>
                        <SendIcon />
                    </IconButton>
                </Paper>
            </Stack>
        </>

    )

}

export default Chat