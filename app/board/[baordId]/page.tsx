import React from 'react'
import Canvas from './_components/convas'


interface BoardIdPageProps {
    params: {
        boardId: string;
    }
}

export default function BoardIdPage({params}: BoardIdPageProps) {
  return (
    <Canvas/>
  )
}
