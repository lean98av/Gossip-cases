import { Request, Response }
    from "express";

import Setting from "../models/setting";

export async function index(
    req: Request,
    res: Response
) {

    const rows =
        await Setting.findAll();

    const settings: any = {

        whatsapp: "",

        email: "",

        instagram: "",

        address: ""
    };

    rows.forEach(row => {

        settings[row.key] = row.value;

    });

    res.render(
        "admin/settings",
        {
            settings
        }
    );
}

export async function save(
    req: Request,
    res: Response
) {

    const {
        whatsapp,
        email,
        instagram,
        address
    } = req.body;

    await saveSetting(
        "whatsapp",
        whatsapp
    );

    await saveSetting(
        "email",
        email
    );

    await saveSetting(
        "instagram",
        instagram
    );

    await saveSetting(
        "address",
        address
    );

    res.redirect("/admin/settings");
}

async function saveSetting(
    key: string,
    value: string
) {

    const existing =
        await Setting.findOne({
            where: { key }
        });

    if (existing) {

        existing.value = value;

        await existing.save();

    } else {

        await Setting.create({
            key,
            value
        });
    }
}