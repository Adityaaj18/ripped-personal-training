import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../model/userModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";

connect();

export async function POST(request) {
    //extract data from the token
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    //check if user exists
    return NextResponse.json({
        message: "User Found",
        data: user
    });
}
