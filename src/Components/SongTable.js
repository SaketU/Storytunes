import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const SongTable = ({ songs }) => (
  <Table aria-label="Songs table" style={{ width: '90%', tableLayout: 'fixed', margin: '0 auto', backgroundColor: '#1c1c1c', color: 'white' }}>
    <TableHeader>
      <TableColumn style={{ width: '35%' }}>Name</TableColumn>
      <TableColumn style={{ width: '35%' }}>Artists</TableColumn>
      <TableColumn style={{ width: '15%' }}>Year</TableColumn>
      <TableColumn style={{ width: '15%' }}>Preview</TableColumn>
    </TableHeader>
    <TableBody>
      {songs.map((song, index) => (
        <TableRow key={song.id} style={{ height: '40px', backgroundColor: index % 2 === 0 ? '#1c1c1c' : '#323232' }}>
          <TableCell style={{ padding: '5px 10px' }}>{song.name}</TableCell>
          <TableCell style={{ padding: '5px 10px' }}>{song.artists.map(artist => artist.name).join(', ')}</TableCell>
          <TableCell style={{ padding: '5px 10px' }}>{new Date(song.album.release_date).getFullYear()}</TableCell>
          <TableCell style={{ padding: '5px 10px' }}>
            {song.preview_url ? (
              <audio controls style={{ width: '100%' }}>
                <source src={song.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              'N/A'
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default SongTable;
