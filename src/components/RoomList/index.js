import React from 'react'
import style from './index.module.css'

const Icon = id => (
  <svg>
    <use xlinkHref={`index.svg#${id}`} />
  </svg>
)

const Room = (state, actions) => room =>
  room && room.userIds && room.userIds.length < 100 ? (
    <li
      key={room.id}
      disabled={state.room.id === room.id}
      onClick={e => actions.joinRoom(room)}
    >
      <p>
        {Icon(
          room.name.match(state.user.id)
            ? 'members'
            : room.isPrivate ? 'lock' : 'public'
        )}
        <span>{room.name.replace(state.user.id, '')}</span>
      </p>
    </li>
  ) : null

export const RoomList = ({ state, actions }) => (
  <ul className={style.component}>
    {state.rooms
      .filter(x => x.name.match(state.user.id))
      .map(Room(state, actions))}
    {state.rooms
      .filter(x => !x.name.match(state.user.id) && x.isPrivate)
      .map(Room(state, actions))}
    {state.rooms
      .filter(x => !x.name.match(state.user.id) && !x.isPrivate)
      .map(Room(state, actions))}
  </ul>
)