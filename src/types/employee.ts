export interface DetailEmployeeRequest {
    detailEmployeeId: number,
    employeeId: number;
    employeeName: string;
    birthDate: string;
    positionId: number;
    branchId: number;
    contractPeriod: number;
    startDate: string;
}

export interface DetailEmployee {
    employeeId: number;
    branchId: number,
    positionId: number;
    detailEmployeeId: number;
    employeeName: string;
    positionCode: string;
    positionName: string;
    branchCode: string;
    branchName: string;
    startDate: string;
    birthDate: string;
    contractPeriod: number;
    contractEnd: string;
}