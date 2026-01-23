/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Chip,
    Button,
    IconButton,
    CircularProgress,
    Modal,
    Fade,
    Backdrop,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    Eye24Regular,
    Globe24Regular,
    Dismiss24Regular,
    ChevronLeft24Regular,
    ChevronRight24Regular,
    Play24Regular,
} from '@fluentui/react-icons';
import { resolveAwsImage } from '../../utils/functions';

const ProjectSection = ({ portfolio, portfolioLoading, searchQuery, observerTarget, hasMore }) => {
    const theme = useTheme();
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleOpenModal = (project, index) => {
        setSelectedProject(project);
        setCurrentIndex(index);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    const handleNext = () => {
        if (currentIndex < portfolio.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);
            setSelectedProject(portfolio[nextIndex]);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex);
            setSelectedProject(portfolio[prevIndex]);
        }
    };

    const handleKeyPress = (e) => {
        if (!selectedProject) return;
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'Escape') handleCloseModal();
    };

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedProject, currentIndex]);

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 8 }}>
                {portfolio.length === 0 && !portfolioLoading ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h5" color="text.secondary">
                            No portfolios found
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {searchQuery ? 'Try adjusting your search' : 'Check back later for new projects'}
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={4}>
                            {portfolio.map((project, index) => {
                                const isVideo = project.video;
                                const mediaUrl = isVideo
                                    ? resolveAwsImage(project.video)
                                    : resolveAwsImage(project.image || project.thumbnail);

                                return (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
                                        <Card
                                            onClick={() => handleOpenModal(project, index)}
                                            sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                                bgcolor: theme.palette.background.paper,
                                                border: `1px solid ${theme.palette.divider}`,
                                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    transform: 'translateY(-12px)',
                                                    boxShadow: `0 20px 60px ${theme.palette.primary.main}20`,
                                                    '& .project-image': {
                                                        transform: 'scale(1.1)',
                                                    },
                                                    '& .overlay': {
                                                        opacity: 1,
                                                    },
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    height: 250,
                                                }}
                                            >
                                                {isVideo ? (
                                                    <video
                                                        src={mediaUrl}
                                                        className="project-image"
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.6s ease',
                                                        }}
                                                        muted
                                                    />
                                                ) : (
                                                    <CardMedia
                                                        component="img"
                                                        image={mediaUrl || '/placeholder-service.jpg'}
                                                        alt={project.title || project.service_name}
                                                        className="project-image"
                                                        sx={{
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            transition: 'transform 0.6s ease',
                                                        }}
                                                    />
                                                )}
                                                <Box
                                                    className="overlay"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        background: `linear-gradient(to bottom, transparent 0%, ${theme.palette.primary.main}90 100%)`,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        opacity: 0,
                                                        transition: 'opacity 0.3s ease',
                                                    }}
                                                >
                                                    <IconButton
                                                        sx={{
                                                            bgcolor: '#fff',
                                                            width: 64,
                                                            height: 64,
                                                            '&:hover': {
                                                                bgcolor: '#fff',
                                                                transform: 'scale(1.1)',
                                                            },
                                                        }}
                                                    >
                                                        {isVideo ? (
                                                            <Play24Regular style={{ fontSize: 28, color: theme.palette.primary.main }} />
                                                        ) : (
                                                            <Eye24Regular style={{ fontSize: 28, color: theme.palette.primary.main }} />
                                                        )}
                                                    </IconButton>
                                                </Box>
                                                <Chip
                                                    label={project.category_name || 'Portfolio'}
                                                    size="small"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 16,
                                                        right: 16,
                                                        bgcolor: theme.palette.primary.main,
                                                        color: theme.palette.primary.contrastText,
                                                        fontWeight: 700,
                                                        backdropFilter: 'blur(10px)',
                                                    }}
                                                />
                                                {isVideo && (
                                                    <Chip
                                                        label="Video"
                                                        size="small"
                                                        icon={<Play24Regular style={{ fontSize: 14 }} />}
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 16,
                                                            left: 16,
                                                            bgcolor: 'rgba(0,0,0,0.7)',
                                                            color: '#fff',
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: theme.palette.text.heading,
                                                        mb: 1,
                                                    }}
                                                >
                                                    {project.service_name || project.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: theme.palette.text.secondary,
                                                        mb: 2,
                                                        lineHeight: 1.7,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {project.description || 'No description available'}
                                                </Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                                        {project.views !== undefined && (
                                                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                                                👁️ {project.views}
                                                            </Typography>
                                                        )}
                                                        {project.likes !== undefined && (
                                                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                                                ❤️ {project.likes}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                    <Button
                                                        size="small"
                                                        endIcon={<Eye24Regular />}
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            textTransform: 'none',
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        View
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        {/* Loading Indicator */}
                        <Box
                            ref={observerTarget}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                py: 4
                            }}
                        >
                            {portfolioLoading && (
                                <CircularProgress />
                            )}
                            {!hasMore && portfolio.length > 0 && (
                                <Typography variant="body2" color="text.secondary">
                                    You've reached the end
                                </Typography>
                            )}
                        </Box>
                    </>
                )}
            </Container>

            {/* Fullscreen Modal */}
            <Modal
                open={Boolean(selectedProject)}
                onClose={handleCloseModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                        sx: { bgcolor: 'rgba(0, 0, 0, 0.95)' }
                    }
                }}
            >
                <Fade in={Boolean(selectedProject)}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            outline: 'none',
                        }}
                    >
                        {/* Close Button */}
                        <IconButton
                            onClick={handleCloseModal}
                            sx={{
                                position: 'absolute',
                                top: 20,
                                right: 20,
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                color: '#fff',
                                backdropFilter: 'blur(10px)',
                                zIndex: 1,
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                                },
                            }}
                        >
                            <Dismiss24Regular />
                        </IconButton>

                        {/* Previous Button */}
                        {currentIndex > 0 && (
                            <IconButton
                                onClick={handlePrevious}
                                sx={{
                                    position: 'absolute',
                                    left: 20,
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    color: '#fff',
                                    backdropFilter: 'blur(10px)',
                                    zIndex: 1,
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                }}
                            >
                                <ChevronLeft24Regular />
                            </IconButton>
                        )}

                        {/* Next Button */}
                        {currentIndex < portfolio.length - 1 && (
                            <IconButton
                                onClick={handleNext}
                                sx={{
                                    position: 'absolute',
                                    right: 20,
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    color: '#fff',
                                    backdropFilter: 'blur(10px)',
                                    zIndex: 1,
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                }}
                            >
                                <ChevronRight24Regular />
                            </IconButton>
                        )}

                        {/* Media Content */}
                        <Box
                            sx={{
                                width: '90%',
                                height: '90%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {selectedProject?.video ? (
                                <video
                                    src={resolveAwsImage(selectedProject.video)}
                                    controls
                                    autoPlay
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '80vh',
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                    }}
                                />
                            ) : (
                                <img
                                    src={resolveAwsImage(selectedProject?.image || selectedProject?.thumbnail)}
                                    alt={selectedProject?.service_name}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '80vh',
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                    }}
                                />
                            )}

                            {/* Info Panel */}
                            <Box
                                sx={{
                                    mt: 3,
                                    maxWidth: '800px',
                                    width: '100%',
                                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: 2,
                                    p: 3,
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                                    <Box>
                                        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                                            {selectedProject?.service_name || selectedProject?.title}
                                        </Typography>
                                        <Chip
                                            label={selectedProject?.category_name || 'Portfolio'}
                                            size="small"
                                            sx={{
                                                bgcolor: theme.palette.primary.main,
                                                color: theme.palette.primary.contrastText,
                                                fontWeight: 600,
                                            }}
                                        />
                                    </Box>
                                    {selectedProject?.links && (
                                        <Button
                                            variant="contained"
                                            endIcon={<Globe24Regular />}
                                            onClick={() => window.open(selectedProject.links, '_blank')}
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Visit Project
                                        </Button>
                                    )}
                                </Box>
                                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.7 }}>
                                    {selectedProject?.description || 'No description available'}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
                                    {selectedProject?.views !== undefined && (
                                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                            👁️ {selectedProject.views} views
                                        </Typography>
                                    )}
                                    {selectedProject?.likes !== undefined && (
                                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                            ❤️ {selectedProject.likes} likes
                                        </Typography>
                                    )}
                                </Box>
                            </Box>

                            {/* Navigation Hint */}
                            <Typography
                                variant="caption"
                                sx={{
                                    mt: 2,
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    textAlign: 'center',
                                }}
                            >
                                Use arrow keys to navigate • Press ESC to close • {currentIndex + 1} of {portfolio.length}
                            </Typography>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default ProjectSection;