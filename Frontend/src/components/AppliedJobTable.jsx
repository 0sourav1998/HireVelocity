import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>Your Applied Jobs</TableCaption>
        <TableHeader className="text-semibold mt-3">
          <TableHead>Date</TableHead>
          <TableHead>Compnay</TableHead>
          <TableHead>Job Role</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4].map((item, index) => (
            <TableRow key={index}> 
              <TableCell>18-02-1999</TableCell>
              <TableCell>Google</TableCell>
              <TableCell>Mern Developer</TableCell>
              <TableCell className="text-right">
                <Badge className="bg-blue-600">Accepted</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
