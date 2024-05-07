import { Badge } from '@chakra-ui/react'
import React from 'react'

export const SupervisorBadge = () => {
  return (
    <Badge variant={'subtle'} colorScheme='teal' boxShadow={'8px 8px 24px 0px rgba(66, 68, 90, 1)'} as={'em'}>
        SUPERVISOR
    </Badge>
  )
}
