import { Avatar, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { router } from '../../Routes'

interface ChatListProps {
    name?: string | null
    _id: string
    selected: boolean
    username: string
    latestMessage: string
}

const ChatListItem = ({ name, _id, selected, username, latestMessage }: ChatListProps) => {

    return (

        <>

            <ListItem alignItems="flex-start" disablePadding>

                <ListItemButton onClick={() => router.navigate(`/chats/${_id}`)} selected={selected}>

                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="" />
                    </ListItemAvatar>

                    <ListItemText
                        primary={name}
                        secondary={

                            <>

                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ color: 'text.primary', display: 'inline' }}
                                >

                                    {username}

                                </Typography>

                                {" " + ` - ${latestMessage}`}
                            </>
                        }

                    />

                </ListItemButton>

            </ListItem>

            <Divider variant="inset" />

        </>

    )

}

export default ChatListItem