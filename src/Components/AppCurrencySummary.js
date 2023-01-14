// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Button, Card, Typography } from "@mui/material";
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';
import Iconify from "./Iconify";
import { fShortenNumber, fCurrency } from "../Utils/formatNumber";
// components
// import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppCurrencySummary.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    currency: PropTypes.number.isRequired,
    sx: PropTypes.object,
};

export default function AppCurrencySummary({
    title,
    currency,
    icon,
    color = "primary",
    sx,
    ...other
}) {
    return (
        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                textAlign: "center",
                color: (theme) => theme.palette[color].darker,
                bgcolor: (theme) => theme.palette[color].lighter,
                ...sx,
            }}
            className={"css-1qx0kfu-MuiPaper-root-MuiCard-root"}
            {...other}
        >
            <IconWrapperStyle
                sx={{
                    color: (theme) => theme.palette[color].dark,
                    backgroundImage: (theme) =>
                        `linear-gradient(135deg, ${alpha(
                            theme.palette[color].dark,
                            0
                        )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
                }}
            >
                <Iconify
                    sx={{ display: "flex", alignItems: "center" }}
                    icon={icon}
                    width={24}
                    height={24}
                />
            </IconWrapperStyle>

            <Typography variant="h3">{fCurrency(currency)}</Typography>

            <Button
                variant="subtitle2"
                sx={{ opacity: 0.72, display: "block" }}
            >
                {title}
            </Button>
        </Card>
    );
}
